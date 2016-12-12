import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

function onChangeMethodRequest(){
    var selectInput = document.getElementById("select-method");
    var selectInputValue = selectInput.value;
    console.log("change method request to " + selectInputValue);
    if (selectInputValue === "POST"){
        console.log('post method');
        var postFormInput = document.getElementById("post-form-input");
        var postFormInputElement = document.createElement('div');
        postFormInputElement.setAttribute('id','post-form-input-element');
        postFormInputElement.innerHTML = '<input type="text" class="form-control" id="key-form" placeholder="Key">'
                                + '<input type="text" class="form-control" id="value-form" placeholder="Value">';
        postFormInput.appendChild(postFormInputElement);
    }
}

function onFormSubmit(){
    
}