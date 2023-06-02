const mineflayer = require("mineflayer");
const statusLabels = require("./util/statusLabels");

let startKasuButton = document.getElementById("startKasuButton");
let stopKasuButton = document.getElementById("stopKasuButton");

let bot;

console.stdinfo = console.info.bind(console);
console.info = function () {
  const infoLog = Array.from(arguments)[0];

  if (
    new RegExp("[A-Z0-9]{8}").test(infoLog) // https://regex101.com/r/NqqPGH/1
  ) {
    let authCode = infoLog.match("[A-Z0-9]{8}");
    statusLabels.statusLabelWarning(
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
    statusLabels.statusLabelError("Please fill out all the forms!");
    return;
  } else {
    statusLabels.statusLabelIdle();
  }

  statusLabels.botStatusLabelIdle();
  createBot();
}

function stopKasu() {
  bot.quit("quit");
  statusLabels.statusLabelIdle();
  statusLabels.botStatusLabelIdle();
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
    version: false,
  });

  bot.on("login", () => {
    statusLabels.statusLabelSuccess(
      `Successfully logged into ${serverIP} with port ${serverPort}`
    );
    startKasuButton.disabled = true;
    stopKasuButton.disabled = false;
  });
  bot.on("kicked", (reason, loggedIn) => {
    statusLabels.statusLabelError(
      `You've been kicked from ${serverIP} for ${reason}. Logged in: ${loggedIn}`
    );
    startKasuButton.disabled = true;
    stopKasuButton.disabled = false;
  });
  bot.on("error", (err) => {
    botStatusLabel.textContent = `Bot status: ${err}`;
    botStatusLabel.style.color = "LightCoral";
  });
  bot.on("end", (reason) => {
    if (reason !== "quit") {
      createBot();
    }
  });
}
