const allTickets = document.getElementById('tickets');
const elmMessage = document.getElementById('message');
const elmMsg = document.getElementById('noTicket');

async function getAllTickets() {
    try {
        const response = await fetch('http://localhost:4000/verify/getAllTickets', { method:('GET') });
        const data = await response.json();
        if(data.success) {
            displayTickets(data.tickets);
        }
    }
    catch (error){
        console.log(error);
    }
}

//display events
async function displayTickets(tickets) {
    allTickets.innerHTML='';

    for(ticket of tickets) {
        const { ticketId, confirmed } = ticket;
        if(!confirmed)
        {
            allTickets.innerHTML += `
            <li>
                <div class="ticketInfo">
                    <p>${ticketId}<p>
                </div>
                <button id="${ticketId}" class="btn btnVerify">confirm ticket number</button>
            </li>`;
        }
    }
    if(allTickets.innerHTML == ''){
        elmMsg.innerText = 'Hurray! There is no ticket to verify :)';
    }
    else{
        bindConfirmTicket();
    }
}

function bindConfirmTicket() {
    const AllVerifyButtons = document.getElementsByClassName('btnVerify');
    for(verifyButton of AllVerifyButtons) {
        verifyButton.addEventListener('click', confirmTicket);
    }
}

async function confirmTicket() {
    try {
        const ticketId = this.id;
        const response = await fetch(`http://localhost:4000/verify/${ticketId}`, { method:('POST') });
        const data = await response.json();
        if (data.success) {
            elmMessage.innerText = `Ticket No. ${ticketId} confirmed`;
        }
        else {
            elmMessage.innerText = 'Something is wrong, Please try again!';
        }
        getAllTickets();
    }
    catch (error) {
        console.log(error);
    }
}

getAllTickets();