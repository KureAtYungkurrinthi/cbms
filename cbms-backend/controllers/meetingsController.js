const {Meeting, Attendee, Room, User} = require('../models/Meeting');
const {Agenda} = require('../models/Agenda');

const transporter = require('../lib/email');
const ical = require('ical-generator').default;

const getAllMeetings = async (req, res) => {
    try {
        const whereClause = req.decoded.role === 'admin' ? {} : {id: req.decoded.id};

        const meetings = await Meeting.findAll({
            include: [{
                model: User, attributes: [], where: whereClause,
            }, {
                model: User, attributes: {exclude: ['hash', 'salt', 'token', 'createdAt', 'updatedAt']}, through: {
                    attributes: ['isPresenter'],
                }, as: 'attendees',
            }, {
                model: Room, attributes: {exclude: ['createdAt', 'updatedAt']}, as: 'room',
            }], attributes: {exclude: ['roomId', 'createdAt', 'updatedAt']},
        });

        if (meetings.length > 0) {
            for (const meeting of meetings) {
                meeting.setDataValue('hasAgendas', await Agenda.count({where: {meetingId: meeting.id}}) > 0);
            }
            return res.json(meetings);
        } else {
            return res.status(404).json({message: 'No meetings found'});
        }
    } catch (error) {
        console.error('Error fetching meetings:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const getMeetingById = async (req, res) => {
    try {
        const whereClause = req.decoded.role === 'admin' ? {} : {id: req.decoded.id};

        const meeting = await Meeting.findByPk(req.params.id, {
            include: [{
                model: User, attributes: [], where: whereClause,
            }, {
                model: User, attributes: {exclude: ['hash', 'salt', 'token']}, through: {
                    attributes: ['isPresenter'],
                }, as: 'attendees',
            }, {
                model: Room, as: 'room',
            }], attributes: {exclude: ['roomId']},
        });
        if (meeting) {
            meeting.setDataValue('hasAgendas', await Agenda.count({where: {meetingId: meeting.id}}) > 0);
            return res.json(meeting);
        } else {
            return res.status(404).json({message: 'Meeting not found'});
        }
    } catch (error) {
        console.error('Error fetching meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const createMeeting = async (req, res) => {
    try {
        const {title, startTime, endTime, roomId, notes, attendees} = req.body;
        if (!title || !startTime || !endTime || !roomId || !attendees) return res.status(400).json({message: 'Title, start time, end time, room ID, and attendees are required'});

        const meeting = await Meeting.create({title, startTime, endTime, roomId, notes});
        const attendeesArray = [];
        for (const attendee of attendees) {
            const user = await User.findByPk(attendee.id);
            if (!user) return res.status(404).json({message: `User ID ${attendee.id} not found`});

            const attendeeRecord = await Attendee.create({
                meetingId: meeting.id, userId: user.id, isPresenter: attendee.isPresenter
            });
            attendeesArray.push(attendeeRecord);
        }

        return res.status(201).json({meeting, attendees: attendeesArray});
    } catch (error) {
        console.error('Error creating meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id);
        if (!meeting) return res.status(404).json({message: 'Meeting not found'});

        const {title, startTime, endTime, roomId, notes, isPublished, attendees} = req.body;
        if (title) meeting.title = title;
        if (startTime) meeting.startTime = startTime;
        if (endTime) meeting.endTime = endTime;
        if (roomId) meeting.roomId = roomId;
        if (notes) meeting.notes = notes;

        if (attendees) {
            await Attendee.destroy({where: {meetingId: meeting.id}});
            const attendeesArray = [];
            for (const attendee of attendees) {
                const user = await User.findByPk(attendee.id);
                if (!user) return res.status(404).json({message: `User ID ${attendee.id} not found`});

                const attendeeRecord = await Attendee.create({
                    meetingId: meeting.id,
                    userId: user.id,
                    isPresenter: attendee.isPresenter,
                    isAttended: attendee.isAttended
                });
                attendeesArray.push(attendeeRecord);
            }
            meeting.attendees = attendeesArray;
        }

        if (isPublished) {
            const room = await Room.findByPk(meeting.roomId);

            const dateString = meeting.startTime.toLocaleDateString('en-AU', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const timeString = meeting.startTime.toLocaleTimeString('en-AU') + ' - ' + meeting.endTime.toLocaleTimeString('en-AU') + ', ' + new Date().toLocaleDateString('en-AU', {
                day: '2-digit', timeZoneName: 'short'
            }).substring(4);

            const calendar = ical({
                prodId: '//CBMS//Meeting Notification//EN', method: 'request', events: [{
                    start: meeting.startTime,
                    end: meeting.endTime,
                    summary: meeting.title,
                    description: meeting.notes,
                    location: room.name + ', ' + room.location
                }]
            });

            const attendees = await Attendee.findAll({where: {meetingId: meeting.id}});
            if (attendees.length > 0) {
                for (const attendee of attendees) {
                    const user = await User.findByPk(attendee.userId);
                    const message = {
                        from: 'Meeting Notification <no-reply@cbms.sa.gov.au>',
                        to: `${user.name} <${user.email}>`,
                        subject: 'You Meeting Has Been Updated',
                        text: `Dear ${user.name},\n\nYour meeting "${meeting.title}" has been updated.\nNew details are provided below for your reference.\n\nLocation: ${room.name}, ${room.location}\nDate: ${dateString}\nTime: ${timeString}\nNotes: ${meeting.notes}\n\nPlease check the calendar invitation for the latest details.\n\nRegards,\nCBMS Team`,
                        icalEvent: {
                            method: 'request', content: calendar.toString()
                        }
                    };

                    await transporter.sendMail(message, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                        } else {
                            console.log('Email sent:', info.response);
                        }
                    });
                }
            }
            meeting.isPublished = isPublished;
        }

        await meeting.save();
        return res.json(meeting);
    } catch (error) {
        console.error('Error updating meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByPk(req.params.id);
        if (!meeting) return res.status(404).json({message: 'Meeting not found'});

        if (meeting.isPublished) {
            const room = await Room.findByPk(meeting.roomId);

            const dateString = meeting.startTime.toLocaleDateString('en-AU', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const timeString = meeting.startTime.toLocaleTimeString('en-AU') + ' - ' + meeting.endTime.toLocaleTimeString('en-AU') + ', ' + new Date().toLocaleDateString('en-AU', {
                day: '2-digit', timeZoneName: 'short'
            }).substring(4);

            const calendar = ical({
                prodId: '//CBMS//Meeting Notification//EN', method: 'cancel', events: [{
                    start: meeting.startTime,
                    end: meeting.endTime,
                    summary: meeting.title,
                    description: meeting.notes,
                    location: room.name + ', ' + room.location
                }]
            });

            const attendees = await Attendee.findAll({where: {meetingId: meeting.id}});
            if (attendees.length > 0) {
                for (const attendee of attendees) {
                    const user = await User.findByPk(attendee.userId);

                    const message = {
                        from: 'Meeting Notification <no-reply@cbms.sa.gov.au>',
                        to: `${user.name} <${user.email}>`,
                        subject: 'You Meeting Has Been Cancelled',
                        text: `Dear ${user.name},\n\nYour meeting "${meeting.title}" has been cancelled.\nOriginal details are provided below for your reference.\n\nLocation: ${room.name}, ${room.location}\nDate: ${dateString}\nTime: ${timeString}\nNotes: ${meeting.notes}\n\nPlease check the calendar invitation for the latest details.\n\nRegards,\nCBMS Team`,
                        icalEvent: {
                            method: 'cancel', content: calendar.toString()
                        }
                    };

                    await transporter.sendMail(message, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                        } else {
                            console.log('Email sent:', info.response);
                        }
                    });
                }
            }
        }

        await Attendee.destroy({where: {meetingId: meeting.id}});
        await meeting.destroy();
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {getAllMeetings, getMeetingById, createMeeting, updateMeeting, deleteMeeting};