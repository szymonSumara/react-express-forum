import React from 'react';
import { InputGroup , Button } from "react-bootstrap";

function Subbmit( {onSubbmit, value} ) {
    console.log(onSubbmit);
    return (        
    <InputGroup className="mb-3">
        <Button className="col-12" onClick={onSubbmit}>{value}</Button>
    </InputGroup>);
}

export default Subbmit;