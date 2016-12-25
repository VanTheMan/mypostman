import React, { Component } from 'react';

class ResponsePreview extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
        <div className="ResponsePreview">
            <pre className="response-content">{this.props.responseContent}</pre>
        </div>
        );
    }
}

export default ResponsePreview;
