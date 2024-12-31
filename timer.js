/**********************************************************
*										 				  *
* Title    : JavaScript Countdown Clock  				  *
* Author   : Katherine Adjahoe           				  *
* Created  : February 18, 2017           				  *
* Website  : www.preview.manifestare.com/javascript timer *
* Email    : support@manifestare.com     				  *
*										 				  *
***********************************************************/

let countdown; // setInterval function for countdown clock
let serviceInSession; // setTimeout function for when event is Live
const clock = document.getElementById('clock'); // div that controls the clock container 
const livestreamButton = document.getElementById('door'); // div that controls the button for the user to click to enter the live stream
const daysUnit = document.querySelector('.days'); // span element that displays the amount of days
const hoursUnit = document.querySelector('.hours'); // span element that displays the amount of hours
const minutesUnit = document.querySelector('.minutes'); // span element that displays the amount of minutes
const secondsUnit = document.querySelector('.seconds'); // span element that displays the amount of seconds

const startDate = new Date(2024, 12, 00, 00, 00, 00).getTime(); // initial date and time the countdown clock started from (Year, Month, Day, Hours, Minutes, Seconds,)
startDate > Date.now() ? timer(startDate) : calculateFutureDate(startDate); // conditional statement that decides if the timer function should start with the start date or calculate another date

// timer function takes in a date parameter in milliseconds
function timer(date) {
    // countdown holds the entire timer functionality 
    countdown = setInterval(() => {
        const now = Date.now(); // current date and time
        const differenceInTime = date - now; // distance between current time and future time of event
        // checks timer to see if the distance is zero and if zero
        if (differenceInTime < 0) {
            clearInterval(countdown); // clear timer
            clock.classList.add("hide"); // hide the clock div element
            livestreamButton.classList.remove("hide"); // show the live stream button div element
            // keeps the live stream button div element on the screen for 2 hours or 7200000 milliseconds and then
            serviceInSession = setTimeout(() => {
                livestreamButton.classList.add("hide"); // hide live stream button div element
                calculateFutureDate(date); // pass the date that countdown was counting down to, to the calculateFutureDate function
                clock.classList.remove("hide"); // show the clock again
            }, 7200000); // after 2 hours do what's inside the setTimeout function
            return;
        }
        timeLeft(differenceInTime); // each iteration of setInterval send updated distance to timeLeft function
    }, 1000); // every 1 second
}

// timeLeft function takes a time as a parameter in milliseconds and displays it in Days, Hours, Minutes, and Seconds
function timeLeft(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // milliseconds into days
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // milliseconds into hours
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // milliseconds into minutes
    const seconds = Math.floor((time % (1000 * 60)) / 1000); // milliseconds into seconds

    daysUnit.textContent = days;
    hoursUnit.textContent = hours;
    minutesUnit.textContent = minutes;
    secondsUnit.textContent = seconds;
}

// calculateFutureDate function to calculate the next future date
function calculateFutureDate(date) {
    const nextYear = new Date(date).getFullYear() + 1;
    const nextDate = new Date(nextYear, 0, 1, 0, 0, 0).getTime();
    timer(nextDate);
}

// liveStream function changes the webpage to the webpage where the live stream is hosted
function liveStream (){
	window.location.assign("https://www.bbc.co.uk/iplayer/live/bbcone");
}
