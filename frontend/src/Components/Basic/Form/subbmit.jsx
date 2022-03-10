import React from 'react';
import { InputGroup , Button } from "react-bootstrap";

function Subbmit( {onSubbmit} ) {
    console.log(onSubbmit);
    return (        
    <InputGroup className="mb-3">
        <Button className="col-12" onClick={onSubbmit}>Add post</Button>
    </InputGroup>);
}

export default Subbmit;