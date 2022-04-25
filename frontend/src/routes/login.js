import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import ToggleButton from "../components/ToggleButton";
import { useHistory } from 'react-router-dom';

const Checked = () => <>⚙</>;
const UnChecked = () => <>🎞</>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("User");
  const navigate = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    /*check if the login exists */
    if(status =="User"){
      console.log("verified this is a user")
      navigate.push("/userLanding")
    } else {
      //this is an admin
    }
  }

  function handleChange(state){
    console.log(state)
    if(state == true){
      setStatus("Admin");
    } else {
      setStatus("User");
    }
    
  }



  return (
    <div className="Login">
      <h1>{status}</h1>
       <ToggleButton onChange={state => handleChange(state)} icons={{checked: <Checked />, unchecked: <UnChecked />}} />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" onclick={validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
