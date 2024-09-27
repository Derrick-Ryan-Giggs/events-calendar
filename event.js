//select elements
const calendar = document.getElementById('calendar') //calendar conatiner
const addeventbtn = document.getElementById('add-event') // btn to add event
const eventText = document.getElementById('event-txt') // input field for description
const selectedDatedisplay = document.getElementById('selected-date') // display selectred date
const eventList = document.getElementById('events') // list of events
let selectedDate = '' // stores selected date

//function to create calendar
function createCalendar(){
    for(let i  = 0; i <=30 ; i++){
        const dayDiv = document.createElement('div') // create div for each day
        dayDiv.textContent = i; //set it to day number
        dayDiv.addEventListener('click', ()=> 
            selectDate(i)) // add event listener to selected date
            calendar.appendChild(dayDiv) // append the day to calendar
        }
    }

//function to handle date selection
function selectDate(day){
    selectedDate = `2024-09-${day < 10 ? '0' + day : day}` // formats selected date to yyyy : mm : dd 
    selectedDatedisplay.textContent = selectedDate // 
    displayEvents() // show events for the selected date
}

// event listener for btn
addeventbtn.addEventListener('click', addEvent)

//fucntion to add event
function addEvent(){
    if(selectedDate && eventText.value){
        let events = JSON.parse(localStorage.getItem('events')) || {} // initialise empty object
        if(!events[selectedDate]){
            events[selectedDate]  = []
        }
        events[selectedDate].push(eventText.value) // add new event
        localStorage.setItem('events', JSON.stringify(events)) // save events to storage
        eventText.value = '' // clear input field
        displayEvents() // refresh event dsiplay
    }
}

// function to display events
function displayEvents(){
    let events = JSON.parse(localStorage.getItem('events')) || {} // fetch events from local storage
    eventList.innerHTML = '' // clear current event list
    if(events[selectedDate]){
        events[selectedDate].forEach((event) => {
            const li = document.createElement('li') // create li for each event
            li.textContent = event // set event description
            eventList.appendChild(li) // append it to events list
        })
    }
}

createCalendar()