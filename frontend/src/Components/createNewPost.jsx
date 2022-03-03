import React, { useState } from 'react';

import { FormControl, InputGroup , Form, Button } from "react-bootstrap";
import auth from '../Services/auth';
import * as  posts from '../Services/posts'

function CreateNewPostForm() {
    
    
    const [topic, setTopic] = useState();
    const [text, setText] = useState();
    
    const updateTopic = (e) => {
        setTopic(e.target.value);
    }

    const updateText = (e) => {
        setText(e.target.value);
    }


    const submit = () => {
        const user = auth.getLoggedUser()
        posts.addPost({topic, text});        
    }


    return ( 
    <Form className=" mt-3 p-3 border col-sm-12  text-center ">
        <h3>Create new post</h3>
        <InputGroup  className="mt-3 mb-3 ">
        <FormControl
            placeholder="topic"
            value={topic}
            onChange={updateTopic}
        />
        </InputGroup>
        <InputGroup className="mb-3">
        <Form.Control  value={text} onChange={updateText} as="textarea" rows={3} />
        </InputGroup>
        <InputGroup className="mb-3">
        <Button className="col-12" onClick={submit}>Add post</Button>
        </InputGroup>
    </Form>
);
}

export default CreateNewPostForm;