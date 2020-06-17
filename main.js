/*
 * main.js
 */

'use strict';

// const path = require('path')

const fs = require('fs');
const { app, ipcMain, BrowserWindow } = require('electron')

// 起動 URL
var currentURL = `file://${__dirname}/www/index.html`

ipcMain.on('md5', (event, md5) => {
    console.log(md5)

    fs.unlinkSync('/tmp/text.txt')
    fs.writeFileSync('/tmp/text.txt', "漢字日本語\n", { mode: 0o600, encodeing:'utf-8' })

    app.quit()
})

// Electronの初期化完了後に実行
app.on('ready', function() {
    console.log(`${__dirname}/preload.js`)
    
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
