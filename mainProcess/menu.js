const { Menu, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')

let template = [
    {
        label: 'chengのcalc',
        submenu: [
            {
                label: '关于',
                click: () => {
                    cheng_aboutWindow()
                }
            },
            {
                label: '退出',
                // role: 'quit'
                click: (item, win, event) => {
                    dialog.showMessageBox({
                        type: 'info',
                        title: '退出提示',
                        message: '请问是否真的需要退出',
                        buttons: ['确定', '取消']
                    }, (index) => {
                        if (index === 0) {
                            win.destroy()
                        }
                    })
                }
            }
        ]
    },
    {
        label: '格式',
        submenu: [
            {
                label: '颜色',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Command+shift+c'
                    } else {
                        return 'Ctrl+shift+c'
                    }
                })(),
                click: () => {
                    cheng_setColor()
                }
            },
            {
                label: '字体变大',
                accelerator: 'F10',
                click: (menu, win, event) => {
                    win.webContents.send('add')
                }
            },
            {
                label: '字体变小',
                accelerator: 'F11',
                click: (menu, win, event) => {
                    win.webContents.send('sub')
                }
            },
            {
                label: '默认字体',
                accelerator: 'F12',
                click: (menu, win, event) => {
                    win.webContents.send('default')
                }
            }
        ]
    }
]


const cheng_aboutWindow = () => {
    let win = new BrowserWindow({
        width: 300,
        height: 250,
        title: '关于cheng的calc'
    })

    win.loadURL(path.join(__dirname, '../views/about.html'))
    win.setMenu(null)
}

const cheng_setColor = () => {
    let win = new BrowserWindow({
        width: 250,
        height: 100,
        title: '颜色'
    })

    win.loadURL(path.join(__dirname, '../views/color.html'))
    win.setMenu(null)
}

let menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)

// 在主进程中监听渲染进程发送的显示右键菜单的消息
ipcMain.on('cheng_showContentMenu', (event) => {
    // BrowserWindow.fromWebContents可以获取当前窗口对象
    let win = BrowserWindow.fromWebContents(event.sender)
    // 将此菜单作为 browserWindow 中的上下文菜单弹出
    menu.popup(win)
})




