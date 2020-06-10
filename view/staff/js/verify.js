const allTickets = document.getElementById('tickets');
const elmMessage = document.getElementById('message');
const elmMsg = document.getElementById('noTicket');


function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}
//Send back user to loginpage if not logged in 
async function loggedin() {
    const token = getToken();
    const url = 'http://localhost:4000/auth/loggedin';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    });
    const data = await response.json();
    if (!data.loggedIn) {
        location.href = 'http://localhost:4000/staff/login.html';
        sessionStorage.removeItem('auth');
    }
}

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
loggedin();