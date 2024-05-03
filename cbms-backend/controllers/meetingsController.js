const {Meeting, Attendee, Room, User} = require('../models/Meeting');

const getAllMeetings = async (req, res) => {
    try {
        const whereClause = req.decoded.role !== 'admin' ? {id: req.decoded.id} : {};

        const meetings = await Meeting.findAll({
            include: [{
                model: User, attributes: [], where: whereClause,
            }, {
                model: User, attributes: {exclude: ['hash', 'salt', 'token', 'createdAt', 'updatedAt']}, through: {
                    attributes: ['isPresenter'],
                }, as: 'attendees',
            }, {
                model: Room, attributes: {exclude: ['createdAt', 'updatedAt']},
            }], attributes: {exclude: ['roomId', 'createdAt', 'updatedAt']},
        });

        if (meetings.length > 0) {
            return res.json(meetings);
        } else {
            return res.status(404).json({message: 'No meetings found'});
        }
    } catch (error) {
        console.error('Error fetching meetings:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const getMeetingById = async (req, res) => {
    try {
        const whereClause = req.decoded.role !== 'admin' ? {id: req.decoded.id} : {};

        const meeting = await Meeting.findByPk(req.params.id, {
            include: [{
                model: User, attributes: [], where: whereClause,
            }, {
                model: User, attributes: {exclude: ['hash', 'salt', 'token']}, through: {
                    attributes: ['isPresenter'],
                }, as: 'attendees',
            }, {
                model: Room,
            }], attributes: {exclude: ['roomId']},
        });
        if (meeting) {
            return res.json(meeting);
        } else {
            return res.status(404).json({message: 'Meeting not found'});
        }
    } catch (error) {
        console.error('Error fetching meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createMeeting = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can create meetings'});

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
}

const updateMeeting = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can update meetings'});

        const meeting = await Meeting.findByPk(req.params.id);
        if (!meeting) return res.status(404).json({message: 'Meeting not found'});

        const {title, startTime, endTime, roomId, notes, isPublished, attendees} = req.body;
        if (title) meeting.title = title;
        if (startTime) meeting.startTime = startTime;
        if (endTime) meeting.endTime = endTime;
        if (roomId) meeting.roomId = roomId;
        if (notes) meeting.notes = notes;
        if (isPublished) {
            meeting.isPublished = isPublished;
            // TBD send email to attendees
        }

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

        await meeting.save();
        return res.json(meeting);
    } catch (error) {
        console.error('Error updating meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const deleteMeeting = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can delete meetings'});

        const meeting = await Meeting.findByPk(req.params.id);
        if (!meeting) return res.status(404).json({message: 'Meeting not found'});

        await Attendee.destroy({where: {meetingId: meeting.id}});
        await meeting.destroy();
        return res.json(meeting);
    } catch (error) {
        console.error('Error deleting meeting:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {getAllMeetings, getMeetingById, createMeeting, updateMeeting, deleteMeeting};