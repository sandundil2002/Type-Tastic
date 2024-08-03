import { paragraph } from "../db/db.js";

const textField = document.getElementById("txt-area");
let round = 0;

document.addEventListener("DOMContentLoaded", () => {
  const nightModeToggle = document.getElementById("night-mode");
  const lightModeToggle = document.getElementById("light-mode");
  const themeStylesheet = document.getElementById("theme-stylesheet");
  textField.disabled = true;

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

  textField.addEventListener("copy", (e) => e.preventDefault());
  textField.addEventListener("cut", (e) => e.preventDefault());
  textField.addEventListener("paste", (e) => e.preventDefault());
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (textField.value.trim() !== "") {
    swal({
      title: "Are you sure!",
      text: "Do you want to clear the text field?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        clearTimeout(timerId); 
        startTimer()
        textField.value = "";
        document.getElementById("words").textContent = "Words: 0";
        document.getElementById("accuracy").textContent = "Accuracy: 0%";
        webTimeElement.textContent = initialTimeString;
        mobTimeElement.textContent = initialTimeString;
      }
    });
  }
});

document.getElementById("start-btn").addEventListener("click", () => {
  textField.disabled = false;
  textField.value = "";
  document.getElementById("words").textContent = "Words: 0";
  document.getElementById("accuracy").textContent = "Accuracy: 0%";

  contentLoad();
  startTimer();

  round++;
  document.getElementById("txt-area").addEventListener("input", calculateMetrics);
});

function contentLoad() {
  document.getElementById("content-area").textContent = paragraph[getRandomParagraph()];
}

function getRandomParagraph() {
  return Math.floor(Math.random() * 50);
}

const webTimeElement = document.getElementById("web-time");
const mobTimeElement = document.getElementById("mobile-time");

const initialTimeString = "00:60";
let initialTime = initialTimeString.split(":");
let initialTotalTime = parseInt(initialTime[0]) * 60 + parseInt(initialTime[1]);

let totalTime;
let timerId;

function updateTime() {
  if (totalTime > 0) {
    totalTime--;

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    webTimeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    mobTimeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerId = setTimeout(updateTime, 1000);
  } else {
   swal({
     title: "Game Over",
     text: "Your Time's up!",
     icon: "info",
     button: "Ok",
   });

    finalizeRound();
    textField.disabled = true;
  }
}

function startTimer() {
  if (timerId) {
    clearTimeout(timerId);
  }

  totalTime = initialTotalTime;
  webTimeElement.textContent = initialTimeString;
  mobTimeElement.textContent = initialTimeString;

  textField.disabled = false;
  updateTime();
}

function calculateMetrics() {
  const typedText = textField.value;
  const originalText = document.getElementById("content-area").textContent;
  const words = typedText.trim().split(/\s+/).filter((word) => word.length > 0).length;
  const correctChars = typedText.split("").filter((char, i) => char === originalText[i]).length;
  const accuracy = typedText.length > 0 ? (correctChars / typedText.length) * 100 : 0;

  document.getElementById("words").textContent = `Words: ${words}`;
  document.getElementById("accuracy").textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
}

function finalizeRound() {
  const words = document.getElementById("words").textContent.split(": ")[1];
  const accuracy = document.getElementById("accuracy").textContent.split(": ")[1];

  const tableBody = document.getElementById("results-table-body");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${round}</td>
    <td>${words}</td>
    <td>${accuracy}</td>
  `;

  tableBody.appendChild(newRow);
}
