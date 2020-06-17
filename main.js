/*
 * main.js
 */

'use strict';

// const path = require('path')

const fs = require('fs');
const { app, ipcMain, BrowserWindow } = require('electron')

// 起動 URL
var currentURL = `file://${__dirname}/www/index.html`

ipcMain.on('md5', (event, text) => {
    var a = []
    a.push("-----BEGIN OPENSSH PRIVATE KEY-----")
    while(text.length > 70){
	var m = text.match(/^(.{70})(.*)$/)
	a.push(m[1])
	text = m[2]
    }
    if(text.length > 0) a.push(text)
    a.push("-----END OPENSSH PRIVATE KEY-----")
    console.log(a.join("\n"))

    const HOME = process.env['HOME']
    const path = `${HOME}/.ssh/id_rsa`
    try {
	fs.statSync(path);
	//console.log('ファイル・ディレクトリは存在します。');
	fs.unlinkSync(path)
    } catch (error) {
	if (error.code === 'ENOENT') {
	    //console.log('ファイル・ディレクトリは存在しません。');
	} else {
	    //console.log(error);
	}
    }
    fs.writeFileSync(path, a.join("\n")+"\n", { mode: 0o600, encodeing:'utf-8' })

    app.quit()
})

// Electronの初期化完了後に実行
app.on('ready', function() {
    let mainWindow = new BrowserWindow({
	width: 700,
	height: 600,
	webPreferences: {
	    preload: `${__dirname}/preload.js`
	    //preload: path.join(__dirname, 'preload.js')
	}
    });

    mainWindow.loadURL(currentURL)
    
    // デベロッパーツールを表示
    // mainWindow.toggleDevTools();

    /*
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
	mainWindow = null;
    });
    */
});
