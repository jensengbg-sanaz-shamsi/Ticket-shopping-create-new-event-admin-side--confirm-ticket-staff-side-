const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('view'));
app.use(bodyParser.json());

//Routers
const staffRouter = require('./routes/staff');
const eventsRouter = require('./routes/event');
const ticketRouter = require('./routes/ticket');
const buyRouter = require('./routes/buy');
const loginRouter = require('./routes/loggedin');
const adminRouter = require('./routes/admin');
const verifyTickets = require('./routes/verifyTickets')

//Endpoints
app.use('/auth', loginRouter);
app.use('/staff', staffRouter);
app.use('/admin', adminRouter);
app.use('/events', eventsRouter);
app.use('/ticket', ticketRouter);
app.use('/buy', buyRouter);
app.use('/verify', verifyTickets);


app.listen(4000);
console.log('Server Started!!!');