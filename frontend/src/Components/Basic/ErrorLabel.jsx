import React from 'react';


function ErrorLabel({value}) {


    console.log("Render error")

    return ( 
    <div className="col-12 p-3">
        <span  className="text-danger">{value}</span>
    </div> );
}

export default ErrorLabel;