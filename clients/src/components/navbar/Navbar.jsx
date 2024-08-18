import axios from "axios";
import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  // console.log(user.details.username)
  const {loading, error, dispatch} = useContext(AuthContext)

  const handleClick = async(e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/logout")
        navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
    }
}
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration: "none"}}>
        <span className="logo">Hotels.com</span>
        </Link>
        <div className="navItems">
          <button className="navButton" onClick={() =>navigate("/register")}>Register</button> {'    '}
          {user? "" : <button className="navButton" onClick={() =>navigate("/login")}>Login</button> }
          { user ? user.details.username : ""}
          {user ? <button className="navButton" onClick={handleClick}>Logout</button> :""}
        </div>
      </div>
    </div>
  )
}

export default Navbar