const mineflayer = require("mineflayer");

let bot;

function onKasuStart() {
  bot = mineflayer.createBot({
    host: document.getElementById("serverIP").value,
    port: document.getElementById("serverPort").value,
    username: document.getElementById("userEmail").value,
    auth: "microsoft",
    version: "1.19.3",
  });
}
