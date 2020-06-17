/*
 * main.js
 */

'use strict';

const fs = require('fs');
const { app, ipcMain, BrowserWindow } = require('electron')

// 起動 URL
var currentURL = `file://${__dirname}/www/index.html`

ipcMain.on('secret', (event, text) => {
    const data = "-----BEGIN OPENSSH PRIVATE KEY-----\n" +
	  text.replace(/.{70}/g,"$&\n") +
	  "\n-----END OPENSSH PRIVATE KEY-----\n"

    const HOME = process.env['HOME']
    const path = `${HOME}/.ssh/id_rsa`
    try {
	fs.statSync(path);
	fs.unlinkSync(path)
    } catch (error) {
    }
    fs.writeFileSync(path, data, { mode: 0o600, encodeing:'utf-8' })
    // fs.writeFileSync(path, a.join("\n")+"\n", { mode: 0o600, encodeing:'utf-8' })

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
