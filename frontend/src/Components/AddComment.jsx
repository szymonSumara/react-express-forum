import React, {useState} from 'react';
import * as comment from '../Services/comment'
import {Form, InputGroup, Button} from 'react-bootstrap';
import Input from './Basic/Form/Input';
import TextArea from './Basic/Form/TextArea';
import Subbmit from './Basic/Form/Subbmit';

function AddComment({postId, userId, onAddComment}) {

    const [text, setText] = useState("");

    const updateText = (e) => {
        setText(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        comment.addComment({postId, userId, text});
        onAddComment( text);
    }


    return ( <>
        <Form className=" mt-3 p-3 border col-sm-12  text-center ">
            <TextArea value={text} onChange={updateText} />
            <Subbmit  onSubbmit={submit} value={"Add Comment"}/>
        </Form>    
    </> );
}

export default AddComment;