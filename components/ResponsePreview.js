import React, { Component } from 'react';

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

class ResponsePreview extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
        <div className="ResponsePreview">
            <h4>RESPONSE</h4>
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                    <a href="#header" aria-controls="header" role="tab" data-toggle="tab">Header</a>
                </li>
                <li role="presentation">
                    <a href="#respone" aria-controls="respone" role="tab" data-toggle="tab">Body</a>
                </li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="header">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mapObject(this.props.header, function (key, value) {
                                return <tr key={key}><td>{key}</td><td>{value}</td></tr>;
                            })}
                        </tbody>
                    </table>
                </div>
                <div role="tabpanel" className="tab-pane" id="respone">
                    <pre className="response-content">{this.props.responseContent}</pre>
                </div>
            </div>
        </div>
        );
    }
}

export default ResponsePreview;
