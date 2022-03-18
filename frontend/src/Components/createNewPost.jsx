import React, { useState , useEffect} from 'react';

import { FormControl, InputGroup , Form, Button } from "react-bootstrap";
import * as auth from '../Services/auth';
import * as  posts from '../Services/posts'
import Input from './Basic/Form/input';
import TextArea from './Basic/Form/textArea';
import Subbmit from './Basic/Form/subbmit';
import Select from './Basic/Form/select';
import  * as  categoryService from '../Services/categories'

function CreateNewPostForm() {
    
    
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect( async () => {
        if(categories.length == 0){
            const fetchedCategory = await categoryService.getCategories();

            setCategories( fetchedCategory.map( c => {
                return {
                    value: c._id,
                    label: c.name,
                    selected: false
                }
            }) );
            console.log("cat" , categories);
        
        }
        console.log('mount it!');
    }, []); //

    const updateSelectedCategory = (e) => {
        console.log(e.target.value);
        setSelectedCategory(e.target.value);
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setText(e.target.value);
    }


    const onSubmit = () => {
        const user = auth.getLoggedUser()
        posts.addPost({title, text, categoryId : selectedCategory});        
    }


    return ( <>
            <Form className=" mt-3 p-3 border col-sm-12  text-center ">
                <h3>Create new post</h3>
                <Input placeholder={"Title"} value={title} onChange={updateTitle}/>
                <Select onChange={updateSelectedCategory} options={categories} selectedValue={selectedCategory} placeholder="Chose post category"/>
                <TextArea placeholder={"Text"} value={text} onChange={updateText}/>
                <Subbmit onSubbmit={onSubmit}/>
        </Form>
    {/* <Form className=" mt-3 p-3 border col-sm-12  text-center ">
        <h3>Create new post</h3>
        <InputGroup  className="mt-3 mb-3 ">
        <FormControl
            placeholder="topic"
            value={title}
            onChange={updateTitle}
        />
        </InputGroup>
        <InputGroup className="mb-3">
        <Form.Control  value={text} onChange={updateText} as="textarea" rows={3} />
        </InputGroup>
        <InputGroup className="mb-3">
        <Button className="col-12" >Add post</Button>
        </InputGroup>
    </Form> */}
    </>

);
}

export default CreateNewPostForm;