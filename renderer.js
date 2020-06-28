const { ipcRenderer } = require('electron')

ipcRenderer.on('token', (event, token) => {
  document.getElementById('token').textContent = token
})

ipcRenderer.on('push', (event, payload) => {
  console.log(payload)

  const myNotification = new Notification('Electrolytic', {
    body: payload
  })
})
