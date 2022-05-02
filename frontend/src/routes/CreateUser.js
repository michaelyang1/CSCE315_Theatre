
import { useState } from 'react';
import "./CreateUser.css";
import ToggleButton from "../components/ToggleButton";
 

function CreateUser() {
 
  // States for registration
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const Checked = () => <>⚙</>;
  const UnChecked = () => <>🎞</>;
  const [status, setStatus] = useState("User");
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change

  const handleChange = (e) => {
    setFName(e.target.value);
    setSubmitted(false);

    setusername(e.target.value);
    setSubmitted(false);

    setPassword(e.target.value);
    setSubmitted(false);
  }
/*   const handleFName = (e) => {
  };
 
  // Handling the username change
  const handleUsername = (e) => {
    setusername(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  }; */
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fName === '' || username === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
 
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
    } else {
      setStatus("User");
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
        <label className="label">First Name</label>
        <div className='row'>
        <input onChange={handleChange} className="input"
          value={fName} type="text" />
        </div>
 
        <label className="label">Username</label>
        <input onChange={handleChange} className="input"
          value={username} type="username" />
 
        <label className="label">Password</label>
        <input onChange={handleChange} className="input"
          value={password} type="password" />

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