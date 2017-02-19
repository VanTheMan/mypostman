import React, { Component } from 'react';
import FormParams from './FormParams';
const ipc = require('electron').ipcRenderer;

class SubmitForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: '',
            method: '',
            params: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleSubmit(event){
        let _state = {
            url: this.input.value,
            method : this.select.value,
            params: {}
        }
        console.log("Input value " + this.input.value);
        console.log(this.state);

        ipc.send('submit-form', _state);
        event.preventDefault();
    };

    handleChange(event){
        console.log(this.select.value);
    };

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-sm-8">
                        <input type="text" className="form-control" ref={(input) => this.input = input} placeholder="http://" />
                    </div>
                    <div className="col-sm-2">
                        <select className="form-control" onChange={this.handleChange} ref={(select) => this.select = select} >
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>DELETE</option>
                            <option>PATCH</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-default">
                            URL params
                        </button>
                    </div>
                </div>
                {/*<div className="form-group">
                    <FormParams />
                </div>*/}
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-8">
                        <button type="submit" className="btn btn-primary" id="send-btn">Send</button>
                        <button type="reset" className="btn btn-negative">Reset</button>
                    </div>
                </div>
            </form>
        );
    };

}


export default SubmitForm;
