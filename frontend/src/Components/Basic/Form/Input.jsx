import React from 'react';
import {InputGroup, FormControl} from 'react-bootstrap';


function Input({value, placeholder, onChange, icon, ...others}) {
    return   (      
    <InputGroup  className="mt-3 mb-3 ">
    { icon && <InputGroup.Text >{icon}</InputGroup.Text>}
    <FormControl
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...others}

    />
    </InputGroup>);
}

export default Input;