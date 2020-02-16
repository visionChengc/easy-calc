#  注意
 -electron的版本要是太高的话主进程和渲染进程之间通信有问题建议适用："^3.0.7"
 -进程之间只能点对点   从渲染1=>main  main=>render1 否则必须用win.webContents.send('channel', data)
 -在main或者package文件中运行的是主进程（直接引入的js文件也是主进程）  其他的为渲染进程
 -在设置编译tray的时候  会出错 执行```chcp 65001``` 就好使了
 -npm run packagewin 生成绿色版直接用
 -npm run buildwin  生成安装包直接安装的版本