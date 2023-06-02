const mineflayer = require("mineflayer");
const statusLabel = document.getElementById("statusLabel");
let startKasuButton = document.getElementById("startKasuButton");
let stopKasuButton = document.getElementById("stopKasuButton");
let bot;
console.stdinfo = console.info.bind(console);
console.info = function () {
  const infoLog = Array.from(arguments)[0];

  if (
    new RegExp("[A-Z0-9]{8}").test(infoLog) //https://regex101.com/r/h69seD/1
  ) {
    let authCode = infoLog.match("[A-Z0-9]{8}");
    statusLabelWarning(
      `Looks like it's your first time using Kasu with that email. You'll need to authenticate with Microsoft. To authenticate, open the website https://www.microsoft.com/link and enter the code ${authCode}`
    );
  }
};

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

  createBot();
}

function stopKasu() {
  bot.quit('Stopping bot because user clicked on "Stop Kasu" button');
  bot.on("end", () => statusLabelIdle());
  stopKasuButton.disabled = true;
  startKasuButton.disabled = false;
}
function createBot() {
  let serverIP = document.getElementById("serverIP").value;
  let serverPort = document.getElementById("serverPort").value;

  bot = mineflayer.createBot({
    host: document.getElementById("serverIP").value,
    port: document.getElementById("serverPort").value,
    username: document.getElementById("userEmail").value,
    auth: "microsoft",
    version: "1.19.3",
  });

  bot.on("login", () => {
    statusLabelSuccess(
      `Successfully logged into ${serverIP} with port ${serverPort}`
    );
    startKasuButton.disabled = true;
    stopKasuButton.disabled = false;
  });
  bot.on("kicked", (reason, loggedIn) =>
    statusLabelError(
      `You've been kicked from ${serverIP} for ${reason}. Logged in: ${loggedIn}`
    )
  );
  bot.on("error", (err) => console.log(err));
  bot.on("end", (reason) => console.log(reason));
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
