import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

function CategorySelect({categories, selectedCategory, onSelect}) {

    console.log("Render category select")

    const items = categories.map( (c, k) => {
       return  <Button className="m-1" key={k} onClick={() => onSelect(c.name)} disabled={c.name == selectedCategory} > {c.name}</Button>
    })
    
    items.push(   <Button className="m-1" key={-1} onClick={() => onSelect(null)} disabled={null == selectedCategory} >All</Button>
    )

    return ( 
    <ButtonGroup  className=" col-12 mt-1 mb-1 p-1">
        {items}
    </ButtonGroup> 
  );
}

export default CategorySelect;