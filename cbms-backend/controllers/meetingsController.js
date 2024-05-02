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

module.exports = {getAllMeetings, getMeetingById};