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
    // console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
    // console.log(response.headers.entries);
    return response.json();
}

ipc.on('submit-form', function(event, arg){
    console.log('submit form from index.html');
    console.log(arg);
    var options = {
        hostname: arg.url,
        method: arg.method
    };
    if (arg.method == 'GET'){
        // http.get(arg.url, function(res){
        //     res.setEncoding('utf8');
        //     let rawData = '';
        //     res.on('data', function(data){
        //         rawData += data;
        //     });
        //     res.on('end', function(){
        //         try {
        //             let parsedData = JSON.parse(rawData);
        //             // res.
        //             event.sender.send('server-response', parsedData);
        //         } catch (err){
        //             console.log(err.message);
        //         }
        //     });
        // }).on('error', function(e){
        //     console.log(e);
        // });
        fetch(arg.url, {
            method: arg.method,
            body: JSON.stringify(arg.params)
        }).then(function(response){
            let header = {
                contentType : response.headers.get('Content-Type'),
                date : response.headers.get('date'),
                via: response.headers.get('via'),
                xContentTypeOption: response.headers.get('x-content-type-options'),
                cfRay: response.headers.get('cf-ray'),
                connection: response.headers.get('connection'),
                contentLength: response.headers.get('content-length'),
                pragma: response.headers.get('pragma'),
                server: response.headers.get('server'),
                etag: response.headers.get('etag'),
                vary: response.headers.get('vary'),
            }
            console.log(header);
            response.json().then(function(data){
                console.log("receive json");
                event.sender.send('server-response', {header: header, response: data});
            });
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