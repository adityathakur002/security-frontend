import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import useFetch from "../../hooks/useFetch";
import "./login.css";


export default function Register() { 
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  

//   const {data, loading, error, setData} = useFetch(`http://localhost:8800/api/users/${id}`)
//     const [credentials, setCredentials] = useState({
//         username: '',
//         email: undefined,
//         phone: undefined,
// })
    const [data,setData] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    useEffect(()=> {
        axios.get(`http://localhost:8800/api/users/${id}`)
        .then(response => {
            setData(response.data)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setPhone(response.data.phone)
        })
    }, [])
// const {loading, error, dispatch} = useContext(AuthContext)

console.log(data)
const navigate = useNavigate()
const handleChange = (e) => {
    // setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
   
}
const handleUser =(event)=>setUsername(event.target.value)
const handleEmail =(event)=>setEmail(event.target.value)
const handlePhone =(event)=>setPhone(event.target.value)
console.log(username)
const handleClick = async(e) =>{
    e.preventDefault()
    
    if(window.confirm(`Are you sure to Update User with id ${id}`)){
        axios.put(`http://localhost:8800/api/users/${id}`, {...data, username: username, email: email, phone: phone })
        .then(response =>{
            // setData(data.map(d => 
            //     d._id === id 
            //     ? response.data
            //     : d))
        }) 
        
    }
}

  return (
    
    <div className="login">
        <div style={{height: 200}}>
            
        </div>
        <div className='lContainer'>
        <span className='loginText'>Register Here</span><br></br>
            <input type="text" placeholder='Username' value={username}  onChange={handleUser} className='lInput'/><br></br>
            <input type="email" placeholder='Email' value={email} id='email' onChange={handleEmail} className='lInput'/><br></br>
            <input type="text" placeholder='Phone' value={phone} id='phone' onChange={handlePhone} className='lInput'/><br></br>
            
            <button className="lButton"  onClick={handleClick}>Save</button><br></br>
            {/* {error && <span className='logspan'>{error.message}</span>} */}
        </div>
      
    </div>

 
  )
}
