
import { useState } from 'react';
import "./CreateUser.css";
import ToggleButton from "../components/ToggleButton";
import axios from "axios";
 

function CreateUser() {
 
  // States for registration
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
   const [favMov, setfavMov] = useState('');
  const [favRoom, setfavRoom] = useState('');
  const [phoneNum, setphoneNum] = useState('');  
  const [adminStat, setAdminStat] = useState(0);  
  const [success, setSuccess] = useState(false);

  const Checked = () => <>⚙</>;
  const UnChecked = () => <>🎞</>;
  const [status, setStatus] = useState("User");
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change
  const handleFname = (e) => {
    setFName(e.target.value);
    setSubmitted(false);
  };
  const handleLname= (e) => {
    setLName(e.target.value);
    setSubmitted(false);
  };
  const handleUsername = (e) => {
    setusername(e.target.value);
    setSubmitted(false);
  };
  const handleFavMovie= (e) => {
    setfavMov(e.target.value);
    setSubmitted(false);
  };
  const handleFavRoom= (e) => {
    setfavRoom(e.target.value);
    setSubmitted(false);
  };
  const handlePhoneNum= (e) => {
    setphoneNum(e.target.value);
    setSubmitted(false);
  }; 
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fName === '' || username === '' || password === ''||lName === '' || phoneNum === '' || favMov === ''|| favRoom === '' ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }


    axios
        .post("/users", {
          adminStatus: adminStat,
          firstName: fName,
          lastName: lName,
          favoriteMovie: favMov,
          favoriteRoom: favRoom,
          phoneNumber: phoneNum,
          username: username,
          password: password
        })
        .then(() => {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);

          setFName("");
          setLName("");
          setfavMov("");
          setfavRoom("");
          setusername("");
          setPassword("");
          setphoneNum("");
          setAdminStat(0);
        });
    }


 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {fName} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  function handleToggle(state){
    console.log(state)
    if(state == true){
      setStatus("Admin");
      setAdminStat(1);
    } else {
      setStatus("User");
      setAdminStat(0);
    }
    
  }

 
  return (
      <>
    <div className="CreateUser">
        <div>
            <h1>User Registration</h1>
        </div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */}
        <div className='row'>
            <label className="label">First Name</label>
            <input onChange={handleFname} className="input"
          value={fName} type="text" />

            <label className="label">Last Name</label>
            <input onChange={handleLname} className="input"
          value={lName} type="text" />
        </div>



        <div className='row'>
            <label className="label">favoriteMovie</label>
            <input onChange={handleFavMovie} className="input"
          value={favMov} type="text" />

            <label className="label">Favorite Room</label>
            <input onChange={handleFavRoom} className="input"
          value={favRoom} type="text" />
        </div>

        <div className='row'>
        <label className="label">Username</label>
        <input onChange={handleUsername} className="input"
          value={username} type="username" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />

        </div>
        <label className="label">Phone Number</label>
            <input onChange={handlePhoneNum} className="input"
          value={phoneNum} type="text" />
        <div className='ToggleSection'>
            <h1>{status}</h1>
            <ToggleButton onChange={state => handleToggle(state)} icons={{checked: <Checked />, unchecked: <UnChecked />}} />
        </div>
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default CreateUser