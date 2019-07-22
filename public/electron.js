const electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
// const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const MenuBuilder = require("../electron-core/menu/menu");
const MAIN_PROCESS_REQUEST = require("../electron-core/main-request");

// const REACT_PERFORMANCE = {id: 'fcombecpigkkfcbfaeikoeegkmkjfbfm', electron: '>=1.2.1'};
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let splashScreen;

function createSplash() {
  splashScreen = new BrowserWindow({
    width: 250,
    height: 268,
    frame: false,
    resizable: false,
    backgroundColor: "#FFFFFF",
    fullscreenable: false,
    icon: path.join(__dirname, "../resources/icons/icon.ico"),
    webPreferences: {
      backgroundThrottling: false,
      devTools: isDev ? true : false
    }
  });
  splashScreen.loadURL(
    isDev
      ? `file://${path.join(
          __dirname,
          "../electron-core/static/splash-screen.html"
        )}`
      : `file://${path.join(
          __dirname,
          "../electron-core/static/splash-screen.html"
        )}`
  );
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1270,
    height: 720,
    center: true,
    show: false,
    // frame: false,
    backgroundColor: "#eaf0f3",
    icon: path.join(__dirname, "../resources/icons/icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      devTools: isDev ? true : false
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
}

function prepareApp() {
  createSplash();
  createWindow();

  mainWindow.on("ready-to-show", () => {
    setTimeout(function() {
      splashScreen.close();
      mainWindow.show();
      mainWindow.on("closed", () => (mainWindow = null));

      /* ########### MAIN PROCESS REQUESTS ########### */
      MAIN_PROCESS_REQUEST();
    }, 2000);
  });
}

const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require("electron-devtools-installer");

  return Promise.all([installExtension(REACT_DEVELOPER_TOOLS)]).catch(
    console.log
  );
};

async function initApp() {
  // With Extensions in Dev
  if (isDev) {
    await installExtensions();
  }
  // In Production
  prepareApp();

  app.on("activate", () => {
    if (mainWindow === null) {
      prepareApp();
    }
  });
}

app.on("ready", async () => {
  initApp();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
