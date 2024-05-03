const {Agenda, Meeting, User, Attendee} = require('../models/Agenda');

const getAgendas = async (req, res) => {
    try {
        const attendee = await Attendee.findAll({where: {meetingId: req.params.id, userId: req.decoded.id}});
        if (!attendee || req.decoded.role !== 'admin') return res.status(403).json({message: 'Members can only view their own meeting agendas'});

        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (agendas.length <= 0) return res.status(404).json({message: 'No agendas found'});

        // I hate this I hate this I hate this but this is what frontend dev wants
        const agendasOutput = {
            welcomeDuration: agendas[0].duration,
            welcomePresenter: agendas[0].presenterId ? await User.findByPk(agendas[0].presenterId, {
                attributes: ['id', 'name', 'email']
            }) : null,
            purposeDuration: agendas[1].duration,
            goalsAndObjectives2_1: agendas[1].content,
            implementation2_2: agendas[2].content,
            purposePresenter: agendas[1].presenterId ? await User.findByPk(agendas[1].presenterId, {
                attributes: ['id', 'name', 'email']
            }) : null,
            agendaDuration: agendas[3].duration,
            previousMeetingReview3_1: agendas[3].content,
            actionTaken3_2: agendas[4].content,
            agendaPresenter: agendas[3].presenterId ? await User.findByPk(agendas[3].presenterId, {
                attributes: ['id', 'name', 'email']
            }) : null,
            closingDuration: agendas[5].duration,
            notes: agendas[5].content,
            closingPresenter: agendas[5].presenterId ? await User.findByPk(agendas[5].presenterId, {
                attributes: ['id', 'name', 'email']
            }) : null
        };
        return res.json(agendasOutput);
    } catch (error) {
        console.error('Error fetching agendas:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createAgendas = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Members can only view their own meeting agendas'});

        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (agendas.length > 0) return res.status(409).json({message: 'Agendas already exists for this meeting'});

        // I hate this I hate this I hate this but this is what frontend dev wants
        const {
            welcomeDuration,
            welcomePresenter,
            purposeDuration,
            goalsAndObjectives2_1,
            implementation2_2,
            purposePresenter,
            agendaDuration,
            previousMeetingReview3_1,
            actionTaken3_2,
            agendaPresenter,
            closingDuration,
            notes,
            closingPresenter
        } = req.body;

        await Agenda.create({
            meetingId: req.params.id,
            position: 1000,
            heading: 'Confirm Attendance',
            content: 'Confirm Attendance',
            duration: welcomeDuration,
            presenterId: welcomePresenter
        });
        await Agenda.create({
            meetingId: req.params.id,
            position: 2000,
            heading: 'Goals and Objectives',
            content: goalsAndObjectives2_1,
            duration: purposeDuration,
            presenterId: purposePresenter
        });
        await Agenda.create({
            meetingId: req.params.id,
            position: 2500,
            heading: 'Implementation',
            content: implementation2_2,
            duration: purposeDuration,
            presenterId: purposePresenter
        });
        await Agenda.create({
            meetingId: req.params.id,
            position: 3000,
            heading: 'Agenda',
            content: previousMeetingReview3_1,
            duration: agendaDuration,
            presenterId: agendaPresenter
        });
        await Agenda.create({
            meetingId: req.params.id,
            position: 3500,
            heading: 'Action Taken',
            content: actionTaken3_2,
            duration: agendaDuration,
            presenterId: agendaPresenter
        });
        await Agenda.create({
            meetingId: req.params.id,
            position: 4000,
            heading: 'Closing',
            content: notes,
            duration: closingDuration,
            presenterId: closingPresenter
        });
        return res.json({message: 'Agendas created'});
    } catch (error) {
        console.error('Error fetching agendas:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const updateAgendas = async (req, res) => {
}

const deleteAgendas = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can delete meetings'});

        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (!agendas) return res.status(404).json({message: 'Agenda not found'});

        await Agenda.destroy({where: {meetingId: req.params.id}});
        return res.json({message: 'Agenda deleted'});
    } catch (error) {
        console.error('Error deleting agendas:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {getAgendas, createAgendas, updateAgendas, deleteAgendas};