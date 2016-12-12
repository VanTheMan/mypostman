const electron = require('electron')
const app = electron.app;
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;
const http = require('http');

const BrowserWindow = electron.BrowserWindow;

let mainwindow;

function createWindow(){
    mainwindow = new BrowserWindow();
    mainwindow.loadURL('file://' + __dirname + '/index.html');
    mainwindow.setMenu(null);
    mainwindow.webContents.openDevTools();
    mainwindow.on('closed', function(){
        mainwindow = null;
    });
}; 

ipc.on('submit-form', function(event, arg){
    console.log('submit form from index.html');
    console.log(arg);
    if (arg.method == 'GET'){
        http.get(arg.url, function(res){
            res.on('data', function(data){
                console.log(JSON.parse(data));
                event.sender.send('server-response', JSON.parse(data));
            });
        }).on('error', function(e){
            console.log(e);
        });
    }
});

app.on('ready', createWindow);