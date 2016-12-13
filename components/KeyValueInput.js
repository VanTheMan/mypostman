import React, { Component } from 'react';

class KeyValueInput extends Component {
    constructor(props){
        super(props);
        
    };

    render() {
        return (
        <div className="KeyValueInput">
            <div className="params-type">
                <input type="text" ref={(keyParam) => this.keyParam = keyParam} placeholder="Key" />
                <input type="text" ref={(valueParam) => this.valueParam = valueParam} placeholder="Value" />
            </div>
        </div>
        );
    }
}

export default KeyValueInput;
