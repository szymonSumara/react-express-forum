import React from 'react';


function ErrorLabel({value}) {
    return ( 
    <div className="col-12 p-3">
        <span className="danger">{value}</span>
    </div> );
}

export default ErrorLabel;