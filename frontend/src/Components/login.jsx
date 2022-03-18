import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FormControl, InputGroup , Form,  } from "react-bootstrap";
import {Person, Key} from 'react-bootstrap-icons'
import * as auth from '../Services/auth'
import ErrorLabel from "./Basic/ErrorLabel";


function LoginForm(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const updateLogin = (e) => {
    setLogin(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await auth.login(login,password);
    console.log(result)
    if(result.ok){
     //const { state } = props.location;
     window.location =  "/";
    }else{
      setError(result.data);
    }
  }


  return (
        <Form className="p-3 border col-sm-12  col-md-6 col-lg-4 text-center ">
            <h2>Log to forum</h2>
            <InputGroup  className="mt-3 mb-3 ">
            <InputGroup.Text ><Person/></InputGroup.Text>
            <FormControl
                placeholder="Login"
                value={login}
                onChange={updateLogin}
            />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text ><Key/></InputGroup.Text>
            <FormControl placeholder="password" type="password" value={password} onChange={updatePassword} />
            <ErrorLabel value={error} />
            </InputGroup>
            <InputGroup className="mb-3">
            <Button onClick={onSubmit} className="col-12">Log</Button>
            </InputGroup>
            <Link to="/newAccount"><h6>I dont have account</h6></Link>
        </Form>
  );
}

export default LoginForm;
