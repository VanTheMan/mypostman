import React, { Component } from 'react';
import KeyValueInput from './KeyValueInput';

class FormParams extends Component {
    constructor(props){
        super(props);
        
    };

    render() {
        return (
        <div className="FormParams">
            <div className="params-type">
                <button>form-data</button>
                <button>x-www-form-urlencoded</button>
                <button>raw</button>
            </div>
            <KeyValueInput />
            <KeyValueInput />
            <KeyValueInput />
        </div>
        );
    }
}

export default FormParams;
