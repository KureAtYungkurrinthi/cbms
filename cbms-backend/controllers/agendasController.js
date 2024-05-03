const {Agenda, Meeting, User, Attendee} = require('../models/Agenda');

const getAgendas = async (req, res) => {
    try {
        const attendee = await Attendee.findAll({where: {meetingId: req.params.id, userId: req.decoded.id}});
        if (!attendee || req.decoded.role !== 'admin') return res.status(403).json({message: 'Members can only view their own meeting agendas'});

        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (agendas.length <= 0) return res.status(404).json({message: 'No agendas found'});

        const agendasArray = [];
        for (const agenda of agendas) {
            let presenter = null;
            if (agenda.presenterId) {
                const user = await User.findByPk(agenda.presenterId);
                presenter = {id: user.id, name: user.name, email: user.email};
            }
            agendasArray.push({
                id: agenda.id,
                position: agenda.position,
                heading: agenda.heading,
                content: agenda.content,
                duration: agenda.duration,
                presenter: presenter
            });
        }
        return res.json(agendasArray);
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