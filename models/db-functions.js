const bcrypt = require('bcrypt');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('models/database.json');
const db = low(adapter);

const saltRounds = 10;

module.exports = {
    async getAllEvents() {
        return await db.get('events').value();
    },

    async getEventById(id) {
        return await db.get('events').find({ id: id }).value();
    },

    async addEvent(body) {
        const events = await db.get('events').value();
        var newId = events.length + 1;
        body.id = newId.toString();
        return await db.get('events').push(body).write();
    },

    async getAllTickets() {
        return await db.get('tickets').value();
    },

    async buyTicket(ticketId, eventId) {
        return await db.get('tickets').push({ ticketId: ticketId, eventId: eventId, confirmed: false}).write();
    },

    async getTicket(ticketId) {
        return await db.get('tickets').find({ ticketId: ticketId }).value();
    },

    async getEventTicketByTicketId(ticketId) {
        const ticket = await db.get('tickets').find({ ticketId: ticketId }).value();
        const event = await db.get('events').find({ id: ticket.eventId }).value();

        return {
            ticketId: ticket.ticketId,
            eventName: event.title,
            eventLocation: event.where,
            eventDatum: event.date,
            eventStart: event.startTime,
            eventFinish: event.finishTime,
        }
    },

    async confirmTicket(id) {
        return await db.get('tickets').find({ ticketId: id }).assign({ confirmed: true }).write();
    },

    async getUserName(user) {
        return await db.get('users').find({ username: user.username }).value();
    },

    async getUserId(user) {
        return await db.get('users').find({ uuid: user.uuid }).value();
    },

    async hashPassword(passwordToHash) {
        return await bcrypt.hash(passwordToHash, saltRounds);
    },

    async matchPassword(userPassword, hash) {
        return await bcrypt.compare(userPassword, hash);
    },

    async ticketsLeft(eventId) {
        const event = await db.get('events').find({id: eventId}).value();
        return await db.get('events').find({id: eventId}).assign({ sold: event.sold + 1 }).write();
    }
}