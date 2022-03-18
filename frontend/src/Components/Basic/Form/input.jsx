import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';


function Input({value, placeholder, onChange, icon}) {
    return   (      
    <InputGroup  className="mt-3 mb-3 ">
    <FormControl
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    />
    </InputGroup>);
}

export default Input;