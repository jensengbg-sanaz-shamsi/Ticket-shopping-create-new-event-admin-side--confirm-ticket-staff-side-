const elmEvent = document.getElementById('event');

async function getEvent() {
    try {
        const urlParams = new URLSearchParams(location.search);
        const eventId = urlParams.get('id');
        const response = await fetch(`http://localhost:4000/buy/${eventId}`,
        { method:('GET') });
        const data = await response.json();
        if(data.success) {
            displayEvent(data.event);
        }
    }
    catch (error){
        console.log(error);
    }
}

//display event
async function displayEvent(event) {
    elmEvent.innerHTML='';

    const{id, title, where, date, startTime, finishTime, price } = event;
    elmEvent.innerHTML += `
        <div class="info">
            <h4>${title}</h4>
            <p class="time">${date} ${startTime} - ${finishTime}</p>
            <p class ="where">${where}</p>
            <p class ="price">${price}</p>
            <a id="btnBuy" data-id="${id}" class="greenButton">Buy</a>
        </div>`
    bindBuyEvent();    
}

function bindBuyEvent() {
    const elmBtnBuy = document.getElementById('btnBuy');
    elmBtnBuy.addEventListener('click', buyTicket);
}

async function buyTicket() {
    try {
        const elmBtnBuy = document.getElementById('btnBuy');
        const response = await fetch(`http://localhost:4000/ticket/${elmBtnBuy.dataset.id}`, { method:('POST') });
        const data = await response.json();
        if(data.success) {
            location.href = `http://localhost:4000/user/ticket.html?id=${data.ticketId}`;
        }
        else {
            console.log("Server is down! Please contact the site administrator.");
        }
    }
    catch (error) {
        console.log(error);
    }
}

getEvent();
