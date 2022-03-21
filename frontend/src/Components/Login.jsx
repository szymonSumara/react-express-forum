import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  Form,  } from "react-bootstrap";
import {Person, Key} from 'react-bootstrap-icons'
import * as auth from '../Services/auth'
import ErrorLabel from "./Basic/ErrorLabel";
import Input from "./Basic/Form/Input";
import Subbmit from "./Basic/Form/Subbmit";


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

    if(result.ok){
     window.location =  "/";
    }else{
      setError(result.data);
    }
  }


  return (
        <Form className="p-3 border col-sm-12  col-md-6 col-lg-4 text-center ">
            <h2>Log to forum</h2>
            <Input placeholder={"Login"} value={login} onChange={updateLogin} icon={<Person/>}/>
            <Input placeholder={"Password"} value={password} onChange={updatePassword} type="password" icon={<Key/>}/>
            <ErrorLabel value={error} />
            <Subbmit onSubbmit={onSubmit} value="Login"/>
            <Link to="/newAccount"><h6>I dont have account</h6></Link>
        </Form>
  );
}

export default LoginForm;
