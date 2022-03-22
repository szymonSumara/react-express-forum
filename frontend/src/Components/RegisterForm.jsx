import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Person, Key, Mailbox, People } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { register } from "../Services/account";
import Input from "./Basic/Form/Input";
import Subbmit from "./Basic/Form/Subbmit";
import ErrorLabel from "./Basic/ErrorLabel";

function RegisterForm() {
  const [login, setLogin] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const changeLogin = (e) => {
    setLogin(e.target.value);
  };

  const changeNick = (e) => {
    setNick(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const subbmit = async (e) => {
    e.preventDefault();

    const result = await register({login,nick,email,password});
    console.log(result.data)

    if(result.ok){
     window.location =  "/";
    }else{
      console.log(result.data)
      setError(result.data);
    }
  }

  return (
    <Form className="p-3 border col-sm-12  col-md-6 col-lg-4 text-center ">
      <h2>Create account</h2>
      <Input value={login} onChange={changeLogin} placeholder="Login" icon={<Person />}/>
      <Input value={nick} onChange={changeNick} placeholder="Nick" icon={<People />}/>
      <Input value={email} onChange={changeEmail} placeholder="Email" icon={<Mailbox />}/>
      <Input value={password} onChange={changePassword} placeholder="Password" type="password" icon={<Key />}/>
      <ErrorLabel value={error} />
      <Subbmit value="Add account" onSubbmit={subbmit}/>
      <Link to="/login">
        <h6>I already have account</h6>
      </Link>
    </Form>
  );
}

export default RegisterForm;
