const {Agenda, Meeting, User} = require('../models/Agenda');
const {Attendee} = require("../models/Meeting");

const getAgendas = async (req, res) => {
    try {
        const agendas = await Agenda.findAll({where: {meetingId: req.params.id}});
        if (agendas.length > 0) {
            return res.json(agendas);
        } else {
            return res.status(404).json({message: 'No agendas found'});
        }
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