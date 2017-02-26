const electron = require('electron')
const app = electron.app;
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;
const http = require('http');
const fetch = require('isomorphic-fetch');

const BrowserWindow = electron.BrowserWindow;

let mainwindow;

function createWindow(){
    mainwindow = new BrowserWindow({height: 800, width: 1200});
    mainwindow.loadURL('file://' + __dirname + '/index.html');
    mainwindow.setMenu(null);
    mainwindow.webContents.openDevTools();
    mainwindow.on('closed', function(){
        mainwindow = null;
    });
}; 

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

ipc.on('submit-form', function(event, arg){
    console.log('submit form from index.html');
    console.log(arg);
    var options = {
        hostname: arg.url,
        method: arg.method
    };
    if (arg.method == 'GET'){
        http.get(arg.url, function(res){
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', function(data){
                rawData += data;
            });
            res.on('end', function(){
                try {
                    let parsedData = JSON.parse(rawData);
                    event.sender.send('server-response', parsedData);
                } catch (err){
                    console.log(err.message);
                }
            });
        }).on('error', function(e){
            console.log(e);
        });
    } else if (arg.method == 'POST'){
        console.log(arg);
        fetch(arg.url, {
            method: arg.method,
            body: JSON.stringify(arg.params)
        }).then(checkStatus)
        .then(parseJSON)
        .then(function(data){
            console.log(data);
            event.sender.send('server-response', data);
        });
    } else if (arg.method == 'PUT'){
        console.log(arg);
        fetch(arg.url, {
            method: arg.method,
            body: JSON.stringify(arg.params)
        }).then(checkStatus)
        .then(parseJSON)
        .then(function(data){
            console.log(data);
            event.sender.send('server-response', data);
        });
    } 
});

app.on('ready', createWindow);