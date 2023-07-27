const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

let backendProcess;
let win;
let loadingScreen;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 620,
    show: false, // Don't show the main window until it's ready
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // When main window is ready, close the loading screen and show the main window
  win.once('ready-to-show', () => {
    if (loadingScreen) {
      loadingScreen.close();
    }
    win.show();
  });

  win.on('close', (event) => {
    event.preventDefault();
    win.minimize();
  });

  const loadURL = () => {
    win.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
  };

  if (isDev) {
    setTimeout(loadURL, 3000);
  } else {
    loadURL();
  }

  win.webContents.on('did-fail-load', () => {
    console.log('Failed to load, retrying...');
    setTimeout(loadURL, 3000); // Retry every 3 seconds
  });
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow({
    width: 200,
    height: 300,
    frame: false,
    transparent: true,
  });

  loadingScreen.loadURL(
    isDev
      ? 'http://localhost:3000/loading.html'
      : `file://${path.join(__dirname, '../build/loading.html')}`
  );
}

app.whenReady().then(() => {
  backendProcess = require('child_process').fork(
    path.join(__dirname, '../backend/server.js'),
    {
      env: { ...process.env, MONGODB_URI: process.env.MONGODB_URI },
    }
  );

  createLoadingScreen();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    backendProcess.kill();
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
