const { Router } = require('express');
const router = new Router();
const { getAllTickets, confirmTicket, ticketsLeft} = require('../models/db-functions');

router.get('/getAllTickets', async (req, res) => {

    const tickets = await getAllTickets();

    let resObj = {
        success: false
    }
    
    if (tickets) {
        resObj.success = true;
        resObj.tickets = tickets;
    }
    
    res.send(JSON.stringify(resObj));
});

router.post('/:ticketId', async (req, res) => {
    const ticket = await confirmTicket(req.params.ticketId);

    let resObj = {
        success: false
    }

    if (ticket) {
        resObj.success = true;
        ticketsLeft(ticket.eventId);
    }

    res.send(JSON.stringify(resObj));
})

module.exports = router;    