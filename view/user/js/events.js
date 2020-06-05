const allEvents = document.getElementById('events');

async function getEvents() {
    try {
        const response = await fetch('http://localhost:4000/events/getAllEvents',{ method:('GET') });
        const data = await response.json();
        if(data.success) {
            displayEvents(data.events);
        }
    }
    catch (error){
        console.log(error);
    }
}

//display events
async function displayEvents(events) {
    allEvents.innerHTML='';

    for(event of events) {
        const{ id, title, where, date, startTime, finishTime, price } = event;
        allEvents.innerHTML += `
            <li>
                <a href="/user/buy.html?id=${id}">
                <div class ="info">
                    <div class = "date">${date}</div>
                    
                    <div class = "title">
                        <div class="detail">
                            <h3>${title}</h3>
                            <p class ="where">${where}</p>
                            <p class ="time">${startTime} - ${finishTime}</p>
                        </div>
                        <div class ="price"><p>${price}</p></div>
                    </div>

                </div>
                </a>
            </li>`
    }
}

getEvents();
