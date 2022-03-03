import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FormControl, InputGroup, Form } from "react-bootstrap";
import { Person, Key, Mailbox, People } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { register } from "../Services/account";

function RegisterForm() {
  const [login, setLogin] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const subbmit = (e) => {
    e.preventDefault();
    register({login,nick,email,password});
  }

  return (
    <Form className="p-3 border col-sm-12  col-md-6 col-lg-4 text-center ">
      <h2>Create account</h2>
      <InputGroup className="mt-3 mb-3 ">
        <InputGroup.Text>
          <Person />
        </InputGroup.Text>
        <FormControl placeholder="Login" value={login} onChange={changeLogin} />
      </InputGroup>
      <InputGroup className=" mb-3 ">
        <InputGroup.Text>
          <People />
        </InputGroup.Text>
        <FormControl placeholder="Nick" value={nick} onChange={changeNick} />
      </InputGroup>
      <InputGroup className=" mb-3 ">
        <InputGroup.Text>
          <Mailbox />
        </InputGroup.Text>
        <FormControl placeholder="Email" value={email} onChange={changeEmail} />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <Key />
        </InputGroup.Text>
        <FormControl
          placeholder="Password"
          type="password"
          value={password}
          onChange={changePassword}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Button className="col-12" onClick={subbmit}> Register</Button>
      </InputGroup>
      <Link to="/login">
        <h6>I already have account</h6>
      </Link>
    </Form>
  );
}

export default RegisterForm;
