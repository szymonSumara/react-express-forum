import React from 'react';
import Form from 'react-bootstrap/Form'
import {InputGroup} from 'react-bootstrap';

function Select({onChange, options, placeholder, selectedValue}){
    
    console.log("<Select> :", selectedValue);


    const actualValue = selectedValue || "DEFOULT";
    console.log(actualValue)
    return ( 
        <InputGroup  className="mt-3 mb-3 ">
                <Form.Select size="lg" onChange={onChange} value={actualValue}>
                { selectedValue && <option value={"DEFOULT"} disabled >{placeholder}</option> }
                {
                    options.map( (o,k) => {
                        console.log(o)
                        return <option key={k} value={o.value}>{o.label}</option>
                    })
                }
            </Form.Select>
        </InputGroup>
    )

}

export default Select;