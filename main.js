/*
 * main.js
 */

'use strict';

const fs = require('fs');
const md5 = require('md5');
const { app, ipcMain, BrowserWindow } = require('electron')

const crypt = require("./crypt")

function exist(path){
    try {
	fs.statSync(path);
	return true
    } catch (error) {
	return false
    }
}

function convert(from,to,secret){
    var md5val = md5(secret)

    // 存在するファイルfromを暗号化してtoにする
    var indata = fs.readFileSync(from,'utf-8')
    var inlines = indata.split(/\n/)
    var outlines = []
    for(var i=0;i<inlines.length;i++){
	var line = inlines[i]
	//console.log(`in = ${line}`)
	if(line.match(/\-\-\-\-/)){
	    outlines.push(line)
	}
	else {
	    outlines.push(crypt.crypt(line,md5val))
	    //console.log(`out=${crypt.crypt(line,md5val)}`)
	}
    }
    var out = outlines.join("\n")
    fs.writeFileSync(to, out, { mode: 0o600, encodeing:'utf-8' })
}

ipcMain.on('secret', (event, secret) => {
    const HOME = process.env['HOME']
    const id_rsa = `${HOME}/.ssh/id_rsa`
    const id_rsa_episopass = `${HOME}/.ssh/id_rsa_episopass`
    const id_rsa_exist = exist(id_rsa)
    const id_rsa_episopass_exist = exist(id_rsa_episopass)

    if(id_rsa_exist && !id_rsa_episopass_exist){
	convert(id_rsa,id_rsa_episopass,secret)
    }
    else if(!id_rsa_exist && id_rsa_episopass_exist){
	convert(id_rsa_episopass,id_rsa,secret)
    }

    app.quit()
})

// Electronの初期化完了後に実行
app.on('ready', function() {
    let mainWindow = new BrowserWindow({
	width: 700,
	height: 700,
	webPreferences: {
	    preload: `${__dirname}/preload.js`
	    //preload: path.join(__dirname, 'preload.js')
	}
    });

    const HOME = process.env['HOME']
    const path = `${HOME}/.ssh/qa.json`
    let qajson = fs.readFileSync(path,'utf-8')

    const url = `file://${__dirname}/www/index.html?qa=${encodeURIComponent(qajson)}`
    
    mainWindow.loadURL(url)
    
    // デベロッパーツールを表示
    // mainWindow.toggleDevTools();

    // ウィンドウが閉じられたらアプリも終了
    /*
    mainWindow.on('closed', function() {
	mainWindow = null;
    });
    */
});
