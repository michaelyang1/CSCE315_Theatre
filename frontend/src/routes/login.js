import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import ToggleButton from "../components/ToggleButton";
import { useHistory } from 'react-router-dom';
import Loading from "../images/loading.gif"

const Checked = () => <>⚙</>;
const UnChecked = () => <>🎞</>;

export default function Login() {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("User");
  const navigate = useHistory();

  const [allUsers, setAllUsers] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5914/users',{
        method: "GET"
      }).then(response => {
       if (response.type === 'opaque' || response.ok) {
           response.json().then(item => {
             //console.log("item is:", item)
            setAllUsers(item)
         });
       } 
     }).catch(error => {
       console.log("Error is: ", error)
     });
    },[]); 

  function validateUser(username, password, adminStatus){
    var userExists = allUsers.map(userObj => {
      if(userObj.Username === username && userObj.Password === password && userObj.Admin_Status === adminStatus ){
        console.log("user: ", userObj)
        return true;
      }       
    })
    if(userExists.includes(true)){
      return true
    } else {
      return false
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    if(status =="User"){
      var userValid = validateUser(UserName, password,0)
      console.log("user valid returns->",userValid)
      if(userValid ==true){
        console.log("verified this is a user")
        navigate.push("/userLanding")
      } else {
        console.log("NOT this is a user")
        alert("Invalid login, check status, username and password")
      }
    } else {
      var userValid = validateUser(UserName, password,1)
      console.log("user valid returns->",userValid)
      if(userValid ==true){
        navigate.push("/adminLanding")
      } else {
        console.log("NOT working, admin")
        alert("Invalid login, check status, username and password")
      }
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


  if(allUsers == null){
    return(
      <>
       <img src={Loading} alt="wait until the page loads"/>
      <h1>Loading...</h1>
      </>
    )

  } else {
    return (
      <div className="Login">
        <h1>{status}</h1>
         <ToggleButton onChange={state => handleChange(state)} icons={{checked: <Checked />, unchecked: <UnChecked />}} />
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="UserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              autoFocus
              type="UserName"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
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
          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }


}