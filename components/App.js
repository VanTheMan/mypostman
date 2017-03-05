import React, { Component } from 'react';
import SubmitForm from './SubmitForm';
import ResponsePreview from './ResponsePreview';
import 'bootstrap';
const ipc = require('electron').ipcRenderer;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      header: '',
      responseContent: ''
    };
  }

  componentDidMount(){
      ipc.on('server-response', function(event, arg){
          console.log('receive server response');
          let content = JSON.stringify(arg.response, undefined, 4);
          console.log(arg.header);
          this.setState({ header: arg.header, responseContent: content});
      }.bind(this));
  };

  render() {
    return (
      <div className="App">
        <SubmitForm />
        <hr/>
        <ResponsePreview header={this.state.header} responseContent={this.state.responseContent}/>
      </div>
    );
  }
}

export default App;
