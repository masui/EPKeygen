//
// Electronのレンダラプロセス
//

/*
const { ipcRenderer } = window.native; // preload.js 経由で渡されるデータ

document.body.addEventListener('click', function(e){
    ipcRenderer.send('md5', '123456')
});
*/

/*
$('#generate').on('click', ()=> {
    ipcRenderer.send('md5', '123456')
})
*/

/*
ipcRenderer.on('gyazo', (event, msg) => { // メインプロセスから情報取得
    document.getElementById('info').value += `${msg}\n`
})
*/

//ipcRenderer.on('error', (event, msg) => {
//    document.getElementById('info').value += `${msg}\n`
//})

