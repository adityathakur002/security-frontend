import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import "./login.css";

export default function Register() {
    const [formErrors, setFormErrors] = useState({});
    const [credentials, setCredentials] = useState({
        username1:undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
})
const {loading, error, dispatch} = useContext(AuthContext)
      
const navigate = useNavigate()
const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
}
const [toastShown, setToastShown] = useState(false);
const [displayError, setDisplayError] = useState(false);
const passwordValidate = (e) => {
  const inputPassword = e.target.value;
  setCredentials.password(inputPassword);

  if (inputPassword.length < 7) {
    if (!toastShown) {
      toast.error("Password must be more than 6 characters.");
      setToastShown(true); // Set the flag so the toast won't show again
    }
  } else {
    setToastShown(false); // Reset the flag when the error is corrected
  }
};
const validateForm = (values) => {
    const errorf = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      formErrors = "First Name is required";
    }
    if (!values.lname) {
      errorf.lname = "Phone is required";
    }
    if (!values.email) {
      errorf.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errorf.password = "Password is required";
    } else if (values.password.length < 6) {
      errorf.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errorf.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errorf.cpassword = "Confirm password and password should be same";
    }
    return errorf;
  };

  useEffect(() => {
    // Set displayError to true when an error occurs
    if (error) {
      setDisplayError(true);

      // Hide the error message after 5 seconds
      const timerId = setTimeout(() => {
        setDisplayError(false);
      }, 3000);

      // Cleanup the timer to prevent memory leaks
      return () => clearTimeout(timerId);
    }
  }, [error]);

const handleClick = async(e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/register", credentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        toast.error(err);
    }
}

const divStyle = {
  backgroundColor: 'green', // Choose your desired background color
  padding: '20px',
  borderRadius: '8px',
  width: '400px', // Set the width as per your design
  textAlign: 'center',
  margin: 'auto', // Center the div horizontally
};

  return (
    
    <div className="login">
        <div style={{height: 200}}>
            
        </div>
        <div className='lContainer'>
        <span className='loginText' style={divStyle}>Register Here</span><br></br>
            <form>
            <input type="text" placeholder='Username' id='username' onChange={handleChange} className='lInput'/><br></br>
            <input type="email" placeholder='Email' id='email' onChange={handleChange} className='lInput'/><br></br>
            <input type="text" placeholder='Phone' id='phone' onChange={handleChange} className='lInput'/><br></br>
            <input type="password" placeholder='Password' id='password' onChange={handleChange} className='lInput'/><br></br>
            <button className="lButton" disabled={loading} onClick={handleClick}>Register</button><br></br>
            {displayError && <span className='logspan' style={{fontWeight:'bold'}}>{error.message}</span>}<br></br><br></br>
            {/* <p>{formErrors}</p> */}
            <NavLink to="/login" style={{fontWeight:'bold'}}><span>Already Registered?  </span><span style={{color:'green'}}>  Login</span ></NavLink><br></br>
            </form>
        </div>
        
      
    </div>

 
  )
}
