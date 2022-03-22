import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {Spinner} from 'react-bootstrap'

import {Form} from 'react-bootstrap';
import Input from './Basic/Form/Input';
import Subbmit from './Basic/Form/Subbmit';
import * as postService from '../Services/posts'
import TextArea from './Basic/Form/TextArea';
import Select from './Basic/Form/Select';
import * as categoryService from '../Services/categories'
import ErrorLabel from './Basic/ErrorLabel';

function EditPostForm() {

    let {id} = useParams();

    const [data, setData] = useState({
        isRender : true,
        title : "",
        text:"",
        categories: [],
        selectedCategory: null,
    })

    const [error, setError] = useState('');
    

    useEffect( async () =>{
        if(!data.isRender) return;

        const fetchedCategory = await categoryService.getCategories();
        const post = await postService.getPost(id);
        console.log(post);

        setData({
            isRender: false,
            categories : fetchedCategory.map( c => {
                return {
                    value: c._id,
                    label: c.name,
                }}),
            selectedCategory: post.category._id,
            text: post.text,
            title: post.title
        })
    })

    const updateTitle = (e) => {
        setData({...data, title: e.target.value});
    }

    const updateText = (e) => {
        setData({...data, text: e.target.value})
    }

    const onSubbmit = async (e) => {
        e.preventDefault();
        const result = await postService.updatePost(id, {title, text, categoryId : selectedCategory});        
        if(result.ok) window.location = "/";
        else setError(result.data);
        console.log(result,error)
    }

    const onDelete = async (e) => {
        e.preventDefault();
        await postService.deletePost(id);        
         window.location = "/";

    }

    const updateSelectedCategory = (e) => {
        console.log(e.target.value);
        setData({...data, selectedCategory:e.target.value})
    }

    const {isRender, text, title, selectedCategory, categories} = data;
    console.log(data);
    return     (
        
        <>
            {isRender ?
            <Spinner />
            :
            <Form className=" mt-3 p-3 border col-sm-12  text-center ">
                <Input placeholder={"Title"} value={title} onChange={updateTitle}/>
                <Select options={categories} selectedValue={selectedCategory} onChange={updateSelectedCategory}/>
                <TextArea placeholder={"Text"} value={text} onChange={updateText}/>
                <ErrorLabel value={error} />
                <Subbmit onSubbmit={onSubbmit} value={"Save changes"}/>
                <Subbmit onSubbmit={onDelete} value={"Delete Post"}/>

            </Form>  
        }

        </>

);
}

export default EditPostForm;