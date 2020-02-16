// 引入ipcRenderer
const { ipcRenderer } = require('electron')
let math = require('mathjs')

// 获取展示结果文本框
let resText = document.querySelector('.result-text')

// 加载用户偏好设置
resText.style.color = localStorage.getItem('setColor')
resText.style.fontSize = localStorage.getItem('setFontSize')

ipcRenderer.on('cheng_setColorToRender', (e, color) => {
    resText.style.color = color
    localStorage.setItem('setColor', color)
})
ipcRenderer.on('cheng_setColorToRender', (e, color) => {
    resText.style.color = color
    localStorage.setItem('setColor', color)
})
ipcRenderer.on('add', (e, color) => {
    let fontsize = window.getComputedStyle(resText, null).fontSize
    let newfontsize = fontsize.replace('px', '') - 0 + 2
    if (newfontsize > 80) {
        return
    }
    resText.style.fontSize = newfontsize + 'px'
    localStorage.setItem('setFontSize', newfontsize)
})
ipcRenderer.on('sub', (e, color) => {
    let fontsize = window.getComputedStyle(resText, null).fontSize
    let newfontsize = fontsize.replace('px', '') - 0 - 2
    if (newfontsize < 20) {
        return
    }
    resText.style.fontSize = newfontsize + 'px'
    localStorage.setItem('setFontSize', newfontsize)
})
ipcRenderer.on('default', (e, color) => {
    resText.style.fontSize = '50px'
    localStorage.setItem('setFontSize', 50)
})


// 实现计算功能
// 定义一个变量存储用户当前的输入
let result = ''
let main = {
    // 添加一个标记，标记用户是否按下=
    isEqual: false,
    // 添加一个标记，标记用户是否按下运算符
    isOpt: false,
    // 1.实现用户数字的输入
    clickNum (num) {
        // 判断用户是否刚刚点击了=
        if (this.isEqual && !this.isOpt) {
            result = ''
            resText.innerHTML = result
            this.isEqual = false
        }
        // 判断用户是否重复输入了点
        let isPoint = num === '.'
        if (result.indexOf('.') !== -1 && isPoint) {
            return
        }
        // 将用户的输入依次拼接到result中
        result = result.toString()
        result = result + num
        // 将result值赋值给文本框
        resText.innerHTML = result
    },
    // 重置用户输入
    reset () {
        resText.innerHTML = '0'
        result = ''
    },
    // 实现计算功能
    clickopt (opt) {
        this.isOpt = true
        switch (opt) {
            case '+/-':
                // result = result * -1
                result = math.eval(result + "*-1")
                resText.innerHTML = result
                break;
            case '%':
                result = math.format(math.eval(result + "/100"), 4)
                resText.innerHTML = result
                break
            default:
                result = result + opt
                resText.innerHTML = result
                break;
        }
    },
    // 实现最终的计算功能
    calc () {
        result = math.eval(result).toString()
        resText.innerHTML = result
        this.isEqual = true
        this.isOpt = false
    }
}

// 邮件显示菜单
document.oncontextmenu = () => {
    ipcRenderer.send('cheng_showContentMenu')
}
