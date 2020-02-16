const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.on('ready', () => {
    cheng_createWindow()
})

const cheng_createWindow = () => {
    let win = new BrowserWindow({
        width: 300,
        height: 490,
        title: 'chengの计算器'
    })

    win.loadURL(path.join(__dirname, './views/index.html')) //使用了path模块生成路径
    // win.webContents.openDevTools()
    win.on('close', (event) => {
        // 实现关窗口之后的操作
        // win = null
        // 关闭主窗口的时候同时也关闭整个应用程序
        // app.quit()

        // 只是对窗口隐藏
        win.hide()
        // 隐藏任务栏图标,如果参数为true,就会路过任务栏的显示-不在任务栏中显示
        win.setSkipTaskbar(true)
        // 阻止默认行为
        event.preventDefault()
    })

    // 当窗口加载完毕之后，准备显示的时候触发
    win.on('ready-to-show', function () {
        win.show()
        // 将当前窗口激活
        win.focus()
    })

    require('./mainProcess/menu')
    const createTray = require('./mainProcess/tray')
    createTray(win)

    // 通过ipcMain监听渲染进程发送过来的消息
    ipcMain.on('cheng_setColortoMain', function (event, color) {
        // console.log(color)
        // 从主进程向渲染进程发送消息
        // event.sender.send('hm_setColorToRender',color)
        // 使用win.webContents来实现消息的发送
        win.webContents.send('cheng_setColorToRender', color)
    })
}


