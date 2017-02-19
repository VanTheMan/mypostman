import React, { Component } from 'react';
import KeyValueInput from './KeyValueInput';

class FormParams extends Component {
    constructor(props){
        super(props);
        
    };

    render() {
        return (
        <div className="FormParams">
            <div className="col-sm-2">
                <button className="btn btn-default">form-data</button>
                <button className="btn btn-default">x-www-form-urlencoded</button>
                <button className="btn btn-default">raw</button>
            </div>
            {/*<KeyValueInput />*/}
            {/*<KeyValueInput />*/}
            {/*<KeyValueInput />*/}
        </div>
        );
    }
}

export default FormParams;
