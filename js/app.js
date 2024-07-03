import { paragraph } from "../db/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const nightModeToggle = document.getElementById("night-mode");
  const lightModeToggle = document.getElementById("light-mode");
  const themeStylesheet = document.getElementById("theme-stylesheet");

  if (localStorage.getItem("theme") === "light") {
    themeStylesheet.href = "./style/dark.css";
  } else {
    themeStylesheet.href = "./style/light.css";
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

