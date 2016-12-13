import React, { Component } from 'react';
const ipc = require('electron').ipcRenderer;

class ResponsePreview extends Component {
    constructor(props){
        super(props);
        this.state = { responseContent: ''};
    };

    componentDidMount(){
        ipc.on('server-response', function(event, arg){
            console.log('receive server response');
            let content = JSON.stringify(arg, undefined, 4);
            this.setState({responseContent: content});
        }.bind(this));
    };

    render() {
        return (
        <div className="ResponsePreview">
            <pre className="response-content">{this.state.responseContent}</pre>
        </div>
        );
    }
}

export default ResponsePreview;
