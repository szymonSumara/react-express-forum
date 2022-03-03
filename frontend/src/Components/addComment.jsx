import React, {useState} from 'react';
import * as comment from '../Services/comment'
import {Form, InputGroup, Button} from 'react-bootstrap';

function AddComment({postId, userId}) {

    // const [post, ] = useState(postId);
    // const [user, ] = useState(userId);
    const [text, setText] = useState("");

    const updateText = (e) => {
        setText(e.target.value);
    }

    const submit = () => {
        console.log(postId);
        comment.addComment({postId, userId, text});
    }


    return ( <>
    {postId}
 <Form className=" mt-3 p-3 border col-sm-12  text-center ">
        <InputGroup className="mb-3">
        <Form.Control  value={text} onChange={updateText} as="textarea" rows={3} />
        </InputGroup>
        <InputGroup className="mb-3">
        <Button className="col-12" onClick={submit}>Add Comment</Button>
        </InputGroup>
    </Form>
        
    </> );
}

export default AddComment;