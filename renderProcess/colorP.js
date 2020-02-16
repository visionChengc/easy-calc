// 引入ipcRenderer
const { ipcRenderer } = require('electron')

// 获取所有颜色span
let box = document.getElementById('box')
box.addEventListener('click', (e) => {
    let color = e.target.dataset['color']
    if (color === 'null') {
        return
    }
    ipcRenderer.send('cheng_setColortoMain', color)
})