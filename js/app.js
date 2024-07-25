import { paragraph } from "../db/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const nightModeToggle = document.getElementById("night-mode");
  const lightModeToggle = document.getElementById("light-mode");
  const themeStylesheet = document.getElementById("theme-stylesheet");

  if (localStorage.getItem("theme") === "light") {
    themeStylesheet.href = "./style/light.css";
  } else {
    themeStylesheet.href = "./style/dark.css";
  }

  nightModeToggle.addEventListener("click", () => {
    themeStylesheet.href = "./style/dark.css";
    localStorage.setItem("theme", "dark");
  });

  lightModeToggle.addEventListener("click", () => {
    themeStylesheet.href = "./style/light.css";
    localStorage.setItem("theme", "light");
  });
});

document.getElementById("reset-btn").addEventListener("click", () => {
  swal({
    title: "Are you sure?",
    text: "Do you want to clear the text field!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      document.getElementById("txt-area").value = "";
    }
  });
})

document.getElementById("start-btn").addEventListener("click", () => {
  contentLoad();
  startTimer();
});

function contentLoad() {
  document.getElementById("content-area").textContent =
    paragraph[getRandomParagraph()];
}

function getRandomParagraph() {
  return Math.floor(Math.random() * 50);
}

const webTimeElement = document.getElementById("web-time");
const mobTimeElement = document.getElementById("mobile-time");

const initialTimeString = "00:30";
let initialTime = initialTimeString.split(":");
let initialTotalTime = parseInt(initialTime[0]) * 60 + parseInt(initialTime[1]);

let totalTime;
let timerId;

 function updateTime() {
   if (totalTime > 0) {
     totalTime--;

     let minutes = Math.floor(totalTime / 60);
     let seconds = totalTime % 60;

     webTimeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
       .toString()
       .padStart(2, "0")}`;

       mobTimeElement.textContent = `${minutes
         .toString()
         .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

     timerId = setTimeout(updateTime, 1000);
   } else {
     swal({
       title: "Game Over",
       text: "Your Times up!",
       icon: "info",
       button: "Ok",
     });
   }
 }

 function startTimer() {
   if (timerId) {
     clearTimeout(timerId);
   }

   totalTime = initialTotalTime;
   webTimeElement.textContent = initialTimeString;
   mobTimeElement.textContent = initialTimeString

   updateTime();
 }