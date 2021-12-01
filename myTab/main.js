const container = document.getElementById("container");
const refresh = document.getElementById("refresh");
const quote = document.getElementById("quote");
const blockquote = document.getElementById("blockquote");
const display = document.getElementById("display");
const search = document.getElementById("search");
const googleBtn = document.getElementById("googleBtn");

refresh.addEventListener("click", refreshQuote);
getQuote();
showTime();

setInterval(() => {
  showTime();
}, 1000);

setInterval(() => {
  refreshQuote();
}, 10000);

function getQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "https://api.quotable.io/random");
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      showQuote(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}

function showQuote(data) {
  blockquote.innerHTML = `&ldquo;${data.content}&rdquo; &mdash;
  <footer>${data.author}</footer>
`;
}

function refreshQuote() {
  refresh.classList.add("rotate");
  setTimeout(() => {
    refresh.classList.remove("rotate");
    getQuote();
  }, 1000);
}

function showTime() {
  let time = calculateTime().time;
  let amPm = calculateTime().amPm;
  display.innerHTML = `
  <div class="times-of-day">
  <img src="./imgs/icon-sun.svg" alt="" id="sun-moon" />
  <p><span id="am-pm"> Good ${
    amPm === "AM" ? "morning" : "evening"
  }, </span>IT’S CURRENTLY</p>
</div>
<div class="time">
  <p class="time-output">
    ${time}
  </p>
</div>

  `;
  const sunMoon = document.getElementById("sun-moon");

  if (amPm === "AM") {
    sunMoon.src = "./imgs/icon-sun.svg";
    container.classList.remove("night");
  } else {
    container.classList.add("night");
    sunMoon.src = "./imgs/icon-moon.svg";
  }
}

function calculateTime() {
  var timeNow = new Date();
  var hours = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var timeString = "" + (hours > 12 ? hours - 12 : hours);
  timeString += (minutes < 10 ? ":0" : ":") + minutes;
  var amPm = hours >= 12 ? "PM" : "AM";
  return {
    time: timeString,
    amPm: amPm,
  };
}

search.addEventListener("keyup", searchInput);

function searchInput(e) {
  let url = e.target.getAttribute("search-url");
  let searhPram = e.target.value;
  if (e.key == "Enter") {
    let link = document.createElement("a");
    link.href = url + searhPram;
    link.target = "_self";
    document.body.appendChild(link);
    link.click();
  }
}

googleBtn.addEventListener("click", searchBtn);

function searchBtn() {
  let link = document.createElement("a");
  link.href = search.getAttribute("search-url") + search.value;
  link.target = "_self";
  document.body.appendChild(link);
  link.click();
}
