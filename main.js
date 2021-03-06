const { app, BrowserWindow } = require('electron')

const Electrolytic = require('electrolytic')

const ELECTROLYTIC_APP_KEY = '<YOUR-APP-KEY>'

const electrolytic = Electrolytic({
  appKey: ELECTROLYTIC_APP_KEY,
})

// Visit https://electrolytic.app/dashboard/analytics after you start app to see Analytics reporting there.
electrolytic
  .analytics
  .enable(true) // disabled by default.
  .use(app) // to report current version of the app
  .report() // need to explicitly call it.

electrolytic.on('token', token => { // will be called everytime on app start
  console.log('user token', token);
  mainWindow.webContents.send('token', token)
})

electrolytic.on('push', (payload) => { // when you use the API to send a push
  console.log('got push notification in main', payload)
  mainWindow.webContents.send('push', payload)
})

// when you update the config on our dashboard. It's pushed to all the apps in realtime 🙀
electrolytic.on('config', (config) => {
  console.log('got new config', config)
})

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // to be able to use ipcRenderer
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', app.quit)

