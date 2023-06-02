const mineflayer = require("mineflayer");
const statusLabel = document.getElementById("statusLabel");
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

let bot;

function onKasuStart() {
  if (
    document.getElementById("serverIP").value === "" ||
    document.getElementById("serverPort").value === "" ||
    document.getElementById("userEmail").value === ""
  ) {
    statusLabelError("Please fill out all the forms!");
    return;
  } else {
    statusLabelIdle();
  }

  bot = mineflayer.createBot({
    host: document.getElementById("serverIP").value,
    port: document.getElementById("serverPort").value,
    username: document.getElementById("userEmail").value,
    auth: "microsoft",
    version: "1.19.3",
  });
}

function statusLabelSuccess(text) {
  statusLabel.textContent = `Status: ${text}`;
  statusLabel.style.color = "LightGreen";
}
function statusLabelWarning(text) {
  statusLabel.textContent = `Status: ${text}`;
  statusLabel.style.color = "Khaki";
}
function statusLabelError(text) {
  statusLabel.textContent = `Status: ${text}`;
  statusLabel.style.color = "LightCoral";
}
function statusLabelIdle() {
  statusLabel.textContent = "Status: Idle";
  statusLabel.style.color = "peachpuff";
}
