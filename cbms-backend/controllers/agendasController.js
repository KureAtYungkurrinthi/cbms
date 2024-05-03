const {Agenda, Meeting, User, Attendee} = require('../models/Agenda');

const getAgendas = async (req, res) => {
    try {
        const attendee = await Attendee.findAll({where: {meetingId: req.params.id, userId: req.decoded.id}});
        if (!attendee || req.decoded.role !== 'admin') return res.status(403).json({message: 'Members can only view their own meeting agendas'});

        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (agendas.length <= 0) return res.status(404).json({message: 'No agendas found'});

        // I hate this I hate this I hate this but this is what frontend dev wants
        const agendasOutput = {
            meetingId: req.params.id,
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