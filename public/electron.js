const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

let backendProcess;
let mainWindow;
let secondWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 620,
    show: false, // Don't show the main window until it's ready
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/loading.html'
      : `file://${path.join(__dirname, '../public/loading.html')}`
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.minimize();
  });

  const loadMainURL = () => {
    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
  };

  setTimeout(loadMainURL, 3000);

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('Main window failed to load, retrying...');
    setTimeout(loadMainURL, 3000); // Retry every 3 seconds
  });

  // Create second window
  secondWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the second window with your video content
  const loadSecondURL = () => {
    secondWindow.loadURL(
      isDev
        ? 'http://localhost:3000/video'
      : `file://${path.join(__dirname, '../public/video.html')}`
    );
  };

  loadSecondURL();

  secondWindow.on('closed', () => {
    secondWindow = null;
  });

  secondWindow.webContents.on('did-fail-load', () => {
    console.log('Second window failed to load, retrying...');
    setTimeout(loadSecondURL, 3000); // Retry every 3 seconds
  });
}

app.whenReady().then(() => {
  backendProcess = require('child_process').fork(
    path.join(__dirname, '../backend/server.js'),
    {
      env: { ...process.env, MONGODB_URI: process.env.MONGODB_URI },
    }
  );

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
