import React, { Component } from 'react';
import KeyValueInput from './KeyValueInput';

class FormParams extends Component {
    constructor(props){
        super(props);
        
    };

    render() {
        return (
        <div className="FormParams">
            <div className="col-sm-8">
                <textarea class="form-control"></textarea>
            </div>
            {/*<KeyValueInput />*/}
            {/*<KeyValueInput />*/}
            {/*<KeyValueInput />*/}
        </div>
        );
    }
}

export default FormParams;
