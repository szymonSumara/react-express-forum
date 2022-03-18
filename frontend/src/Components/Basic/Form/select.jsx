import React from 'react';
import Form from 'react-bootstrap/Form'
import {InputGroup} from 'react-bootstrap';

function Select({onChange, options, placeholder, selectedValue}){
    
    console.log("<Select> :", selectedValue);


    return ( 
        <InputGroup  className="mt-3 mb-3 ">
                <Form.Select size="lg" onChange={onChange}>
                    
                { selectedValue == null ? <option value="" disabled selected>{placeholder}</option> : <></>}
                {
                    options.map( o => {
                        return <option selected={selectedValue == o.value} value={o.value}>{o.label}</option>
                    })
                }
            </Form.Select>
        </InputGroup>
    )

}

export default Select;