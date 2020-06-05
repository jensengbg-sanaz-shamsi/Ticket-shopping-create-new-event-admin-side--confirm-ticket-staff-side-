const elmTicket = document.getElementById('ticket');

async function loadTicket() {
    try {
        const urlParams = new URLSearchParams(location.search);
        const ticketId = urlParams.get('id');
        const response = await fetch(`http://localhost:4000/ticket/${ticketId}`, { method:('GET') });
        const data = await response.json();
        if(data.success) {
            displayTicket(data.info);
        }
    }
    catch(error) {
        console.log('error');
    }
}

//display events
async function displayTicket(eventTicket) {
    elmTicket.innerHTML='';

    const { ticketId, eventName, eventLocation, eventDatum, eventStart, eventFinish } = eventTicket;
    elmTicket.innerHTML += `
        <div class="info">
            <span class="detail">what:</span> <br><h4 class="where">${eventName}</h4>
            <span class="detail">where:</span> <br><p class="location">${eventLocation}</p>
            <div class="place">
                <div class="date1"><span class="detail">when:</span> <br><p class ="when">${eventDatum}</p></div>
                <div class="date2"><span class="detail">from:</span> <br><p class ="when">${eventStart}</p></div>
                <div class="date"><span class="detail">to:</span> <br><p class ="when">${eventFinish}</p></div>
            </div>
            <div class ="bilit">
                <img src="../img/A2ED7barcode.png">
                <p class="bilitId"> bilitnumber: ${ticketId}</p>
            </div>       
        </div>`
}

loadTicket();
