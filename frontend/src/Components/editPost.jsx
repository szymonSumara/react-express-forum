import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {Spinner} from 'react-bootstrap'

import {Form} from 'react-bootstrap';
import Input from './Basic/Form/input';
import Subbmit from './Basic/Form/subbmit';
import * as postService from '../Services/posts'
import TextArea from './Basic/Form/textArea';

function EditPostForm() {

    let {id} = useParams();

    
    const [title, setTitle] = useState("");
    const [text, setText ] = useState("");
    const [isRender, setIsRender] = useState(true);

    useEffect( async () =>{
        if(!isRender) return;
        const post = await postService.getPost(id);
        console.log(post);
        setTitle(post.title);
        setText(post.text);
        setIsRender(false);
    })

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setText(e.target.value);
    }

    const onSubbmit = (e) => {
        postService.updatePost(id, {title, text});
    }


    return     (

        <>
            {isRender ?
                <Spinner />
                :
                <Form className=" mt-3 p-3 border col-sm-12  text-center ">
                <Input placeholder={"Title"} value={title} onChange={updateTitle}/>
                <TextArea placeholder={"Text"} value={text} onChange={updateText}/>
                <Subbmit onSubbmit={onSubbmit}/>
</Form>
                
        }

        </>

);
}

export default EditPostForm;