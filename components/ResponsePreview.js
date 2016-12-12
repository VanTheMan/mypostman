import React, { Component } from 'react';

class ResponsePreview extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
        <div className="ResponsePreview">
            <p className="response-content">{this.props.responseContent}</p>
        </div>
        );
    }
}

export default ResponsePreview;
