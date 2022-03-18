import React from 'react';
import Pagination from 'react-bootstrap/Pagination' 

function PaginationBar({onChange,pageCount,selectedPage}) {
    
    console.log('Render pagination bar');
    const items = [];

    if(pageCount <= 1) return (<></>)

    for(let number = 1 ; number <= pageCount; number++){
        items.push(
            <Pagination.Item key={number} active={number === selectedPage} onClick={() => onChange(number)}>
            {number}
          </Pagination.Item>, 
        )
    }

   
    return ( 
        <Pagination className="justify-content-center mt-3">
            {items}
        </Pagination>
     );
}

export default PaginationBar;
