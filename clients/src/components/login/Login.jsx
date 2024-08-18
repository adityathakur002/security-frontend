import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import "./login.css";

export default function Login() {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password: undefined,
})
const [displayError, setDisplayError] = useState(false);
const {loading, error, dispatch} = useContext(AuthContext)

const navigate = useNavigate()

const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
}
useEffect(() => {
    // Set displayError to true when an error occurs
    if (error) {
      setDisplayError(true);

      // Hide the error message after 5 seconds
      const timerId = setTimeout(() => {
        setDisplayError(false);
      }, 2000);

      // Cleanup the timer to prevent memory leaks
      return () => clearTimeout(timerId);
    }
  }, [error]);

const handleClick = async(e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/login", credentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        
    }
}

const divStyle = {
    backgroundColor: '#f0f0f0', // Choose your desired background color
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
        <div className='lContainer' >
        
        <div style={divStyle}><span className='loginText'>Login Here</span></div>
        <br></br>
            <input type="text" placeholder='Username' id='username' onChange={handleChange} className='lInput'/>
            <input type="password" placeholder='Password' id='password' onChange={handleChange} className='lInput'/>
            <button className="lButton" disabled={loading} onClick={handleClick}>Login</button><br></br>
            {displayError && <span className='logspan' style={{fontWeight:'bold'}}>{error.message}</span>}<br></br>
            <NavLink to="/register"><span style={{fontWeight:'bold'}}>Don't have an Account? </span><span style={{fontWeight:'bold', color:'green'}}>Register</span></NavLink><br></br><br></br>
        </div>
      
    </div>

 
  )
}
