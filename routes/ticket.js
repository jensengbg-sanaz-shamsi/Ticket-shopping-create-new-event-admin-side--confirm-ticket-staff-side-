const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');
const router = new Router();
const { buyTicket, getEventTicketByTicketId } = require('../models/db-functions');

router.post('/:eventId', async (req, res) => {
    const ticketId = uuidv4();
    await buyTicket(ticketId, req.params.eventId);
    const eventTicket = await getEventTicketByTicketId(ticketId);
    
    let resObj = {
        success: false
    }
    
    if (eventTicket) {
        resObj.success = true;
        resObj.ticketId = eventTicket.ticketId;
    }
    res.send(JSON.stringify(resObj));
});

router.get('/:ticketId', async (req, res) => {
    const eventTicket = await getEventTicketByTicketId(req.params.ticketId);
    let resObj = {
        success: false
    }
    
    if (eventTicket) {
        resObj.success = true;
        resObj.info = eventTicket;
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router