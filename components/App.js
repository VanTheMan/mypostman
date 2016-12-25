import React, { Component } from 'react';
import SubmitForm from './SubmitForm';
import ResponsePreview from './ResponsePreview';
const ipc = require('electron').ipcRenderer;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {responseContent: ''};
  }

  componentDidMount(){
      ipc.on('server-response', function(event, arg){
          console.log('receive server response');
          let content = JSON.stringify(arg, undefined, 4);
          this.setState({responseContent: content});
      }.bind(this));
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SubmitForm />
        <ResponsePreview responseContent={this.state.responseContent}/>
      </div>
    );
  }
}

export default App;
