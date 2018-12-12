const { app, BrowserWindow } = require('electron')
const http = require('http')

const dev = process.env.NODE_ENV === 'development'
const port = process.env.PORT || 3000

let mainWindow = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 600
  })
  mainWindow.on('closed', () => (mainWindow = null))

  if (dev) {
    // Disable security warnings
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')

    const name = await installExtension(VUEJS_DEVTOOLS.id)
    console.log(`Added Extension: ${name}`)

    // Wait for nuxt to build
    const url = `http://localhost:${port}/`
    const pollServer = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            mainWindow.loadURL(url)
            mainWindow.webContents.openDevTools()
          } else {
            setTimeout(pollServer, 300)
          }
        })
        .on('error', pollServer)
    }
    pollServer()
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  }
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => mainWindow === null && createWindow())
