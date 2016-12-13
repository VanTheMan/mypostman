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
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" ref={(input) => this.input = input} placeholder="Enter request URL here" />
                    <select onChange={this.handleChange} ref={(select) => this.select = select} >
                        <option>GET</option>
                        <option>POST</option>
                        <option>PUT</option>
                        <option>DELETE</option>
                        <option>PATCH</option>
                    </select>
                    <button className="btn btn-form btn-default">
                        URL params
                    </button>
                </div>
                <FormParams />
                <div className="form-actions">
                    <button type="submit" className="btn btn-form btn-primary" id="send-btn">Send</button>
                    <button type="reset" className="btn btn-form btn-negative">Reset</button>
                </div>
            </form>
        );
    };

}


export default SubmitForm;
