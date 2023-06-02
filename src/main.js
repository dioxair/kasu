const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    darkTheme: true,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.setMenu(null);
  win.loadFile(path.join(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
