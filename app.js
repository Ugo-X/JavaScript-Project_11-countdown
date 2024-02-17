const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// selecting our elements
const dday = document.querySelector(".d-day");
const countDown = document.querySelector(".count-Down");
const categories = document.querySelectorAll(".category h4");

// months are zero index based and the clock is 0-24
// here we are inputing our exact future date
let updatedDate = new Date(2024, 11, 18, 11, 59, 00);
// console.log(updatedDate);

//
// setting up the individual dates
//  to replace the content of our dday we have to individually find the days, month etc
const year = updatedDate.getFullYear();
const hours = updatedDate.getHours();
const minutes = updatedDate.getMinutes();
let month = updatedDate.getMonth();
month = months[month];
let day = updatedDate.getDay();
day = weekdays[day];
const date = updatedDate.getDate();

// d day setup
// now this a string concatenation for our dday content
dday.textContent = `Registeration ends, ${day}, ${date} ${month} ${year} ${hours} ${minutes}am `;

// Miliseconds for our future date
const futureTime = updatedDate.getTime();


function showTimeRemainder() {
  const today = new Date().getTime();

  const rt = futureTime - today;
  // next we get each category h4 in miliseconds since our remaining time is in miliseconds
  // recall that:
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1day = 24hr
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // next we want to calculate the remainder of each value we have in our category h4
  // NB: category h4 refers to the days, hours, mins and secs categories.
  let days = Math.floor(rt / oneDay);
  // after we get the number of days, we want to get the hours, minutes and seconds in the remainder, and not the total remaining time in hours minutes and  seconds again and that is where the modulus comes in.
  // here we are saying that after we have divided the remaining time and gotten the number of days, we want to to get the remaining time/remainder and see how many hours are inside there so its rt % oneDay = remainder / oneHour
  let hours = Math.floor((rt % oneDay) / oneHour);
  // here we want to get the remaining/remainder miliseconds after we have gotten the number of total hours in our rt(remaining time) which is equivalent to 50 days as of today.After getting the remaining miliseconds, we want to convert thid value to minutes
  let minutes = Math.floor((rt % oneHour) / oneMinute);
  let seconds = Math.floor((rt % oneMinute) / 1000);

  // here we are returning the values we calculated above into a an array in the same particular order we arranged the categories in our html.
  const values = [days, hours, minutes, seconds];
  // if you notice when the number in our category is less than 10 it will look disorganized because there will be some categories with 2 digits and some with one. So here we want to create it in such a way that if our value is less than then, we add a "0 " before our value

  function organize(item) {
    if (item < 10) {
      item = `0${item}`;
    }
    return item;
  }

  // here we are itereating over each cateogory(days, hours etc) and replacing the values with the values that we calculated above and placed in our values array.
  categories.forEach(function (category, index) {
    category.innerHTML = organize(values[index]);
  });
  if(rt < 0 ){
    clearInterval();
    countDown.innerHTML = ` <h4 class = "over"> Registeration is closed </h4>`;
  }
}

// here we want to set an interval that makes the countdown to be infinite
setInterval(showTimeRemainder,1000)


// make sure you invoke your function after the set interval so you can access it
showTimeRemainder();
