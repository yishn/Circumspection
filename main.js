const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 512,
        useContentSize: true,
        // fullscreen: true,
        show: false
    })

    // window.toggleDevTools()

    window.on('closed', () => { window = null })

    window.webContents
    .on('did-finish-load', () => window.show())
    .on('new-window', evt => evt.preventDefault())

    window.loadURL(`file://${__dirname}/view/index.html`)
})
