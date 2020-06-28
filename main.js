const { app, BrowserWindow } = require('electron')

const Electrolytic = require('electrolytic')

const ELECTROLYTIC_APP_KEY = '<Your-API-Key>'

const electrolytic = Electrolytic({
  appKey: ELECTROLYTIC_APP_KEY,
})

electrolytic.on('token', token => { // will be called everytime on app start
  console.log('user token', token);
  mainWindow.webContents.send('token', token)
})

electrolytic.on('push', (payload) => { // when you use the API to send a push
  console.log('got push notification in main', payload)
  mainWindow.webContents.send('push', payload)
})

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', app.quit)

