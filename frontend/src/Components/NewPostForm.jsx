import React, { useState , useEffect} from 'react';

import { FormControl, InputGroup , Form, Button } from "react-bootstrap";
import * as auth from '../Services/auth';
import * as  posts from '../Services/posts'
import Input from './Basic/Form/Input';
import TextArea from './Basic/Form/TextArea';
import Subbmit from './Basic/Form/Subbmit';
import Select from './Basic/Form/Select';
import  * as  categoryService from '../Services/categories'
import ErrorLabel from '../Components/Basic/ErrorLabel'

function NewPostForm() {
    
    
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
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


    const onSubmit =  async (e) => {
        e.preventDefault();

        const result = await posts.addPost({title, text, categoryId : selectedCategory});        
        if(result.ok) window.location = "/";
        else setError(result.data);
        console.log(result,error)
    }




    return ( <>
            <Form className=" mt-3 p-3 border col-sm-12  text-center ">
                <h3>Create new post</h3>
                <Input placeholder={"Title"} value={title} onChange={updateTitle}/>
                <Select onChange={updateSelectedCategory} options={categories} selectedValue={selectedCategory} placeholder="Chose post category"/>
                <TextArea placeholder={"Text"} value={text} onChange={updateText}/>
                <ErrorLabel value={error} />
                <Subbmit onSubbmit={onSubmit} value={"Add new post"}/>
        </Form>
    </>

);
}

export default NewPostForm;