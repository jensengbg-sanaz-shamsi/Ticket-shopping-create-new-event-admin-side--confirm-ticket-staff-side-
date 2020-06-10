const inputName = document.querySelector('#inputName');
const inputWhere = document.querySelector('#inputWhere');
const inputDate = document.querySelector('#inputDate');
const inputFrom = document.querySelector('#inputFrom');
const inputTo = document.querySelector('#inputTo');
const inputTickets = document.querySelector('#inputTickets');
const inputPrice = document.querySelector('#inputPrice');
const addEventButton = document.querySelector('#addEventButton');

function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}

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


function showAllEvents(events) {
    let eventList = document.querySelector('#events');
    eventList.innerHTML = ''

    for(event of events) {
        const{ title, where, ticket, sold } = event;

        eventList.innerHTML += `   
        <tr>
            <td class="tblFields tblNameField">${title}</td>
            <td class="tblFields">${where}</td>
            <td class="tblFields">${ticket}</td>
            <td class="tblFields">${sold}</td>
        </tr>`
    }
}

async function getAllEvents() {
    const url = 'http://localhost:4000/admin/showevents';

    try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        if(data.success) {
            showAllEvents(data.events);
        }
    }     
    catch (error) {
        console.log(error);
    }
}

async function createEvent(event) {
    try {
        const url = 'http://localhost:4000/admin/addevent';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        return await data;
    } catch(error) {
        console.log(error);
    }
}

function clearForm() {
    inputName.value = '';
    inputWhere.value = '';
    inputDate.value = '';
    inputFrom.value = '';
    inputTo.value = '';
    inputTickets.value = '';
    inputPrice.value = '';
}

addEventButton.addEventListener('click', () => {
    const eventObj = {
        title: inputName.value,
        where: inputWhere.value,
        date: inputDate.value,
        startTime: inputFrom.value,
        finishTime: inputTo.value,
        ticket: inputTickets.value,
        price: inputPrice.value,
        sold: 0,
    }

    createEvent(eventObj);
    clearForm();
    getAllEvents();
});

getAllEvents();
loggedin();

