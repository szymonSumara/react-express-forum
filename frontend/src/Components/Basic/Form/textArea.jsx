import React from 'react';
import {InputGroup, Form} from 'react-bootstrap'

function TextArea({value, onChange}) {
    return ( 
        <InputGroup className="mb-3">
            <Form.Control  value={value} onChange={onChange} as="textarea" rows={3} />
        </InputGroup>
     );
}

export default TextArea;