const statusLabel = document.getElementById("statusLabel");
const botStatusLabel = document.getElementById("botStatusLabel");

module.exports = {
  statusLabelSuccess: function (text) {
    statusLabel.textContent = `Status: ${text}`;
    statusLabel.style.color = "LightGreen";
  },
  statusLabelWarning: function (text) {
    statusLabel.textContent = `Status: ${text}`;
    statusLabel.style.color = "Khaki";
  },
  statusLabelError: function (text) {
    statusLabel.textContent = `Status: ${text}`;
    statusLabel.style.color = "LightCoral";
  },
  statusLabelIdle: function () {
    statusLabel.textContent = "Status: Idle";
    statusLabel.style.color = "peachpuff";
  },
  botStatusLabelIdle: function () {
    botStatusLabel.textContent = "Bot status: Idle";
    botStatusLabel.style.color = "peachpuff";
  },
};
