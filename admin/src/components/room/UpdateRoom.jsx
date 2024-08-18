import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import "./Room.css";
export default function UpdateRoom() {
    const location = useLocation()
  const id = location.pathname.split("/")[2];

  const [room,setRoom] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [maxPeople, setMaxPeople] = useState(0)
  const [desc, setDesc] = useState('')

  const navigate = useNavigate()

  useEffect(()=> {
    axios.get(`http://localhost:8800/api/rooms/${id}`)
    .then(response => {
        setRoom(response.data)
        setTitle(response.data.title)
        setDesc(response.data.desc)
        setPrice(response.data.price)
        setMaxPeople(response.data.maxPeople)
        // setEmail(response.data.email)
        // setPhone(response.data.phone)
    })
}, [])
const handleTitle =(event)=>setTitle(event.target.value)
const handlePrice =(event)=>setPrice(event.target.value)
const handleMaxPeople =(event)=>setMaxPeople(event.target.value)
// const handleAddress =(event)=>setAddress(event.target.value)
// const handleTitle =(event)=>setTitle(event.target.value)
const handleDesc =(event)=>setDesc(event.target.value)
// const handlePrice =(event)=>setCheapPrice(event.target.value)
const handleClick = async(e) =>{
    e.preventDefault()
    
    if(window.confirm(`Are you sure to Update Hotels with id ${id}`)){
        axios.put(`http://localhost:8800/api/rooms/${id}`, {...room, title: title, price: price, maxPeople: maxPeople,  desc: desc })
        // .then(response =>{
        //     setHotels(hotels.map(d => 
        //         d._id === id 
        //         ? response.data
        //         : d))
        // }) 
        }
}

  return (
    <div>
        
        <span className='loginText'>Update Hotel</span><br></br>
    <div style={{display: 'flex'}}>
      <div style={{height: 200}}>
      
            </div>
            <div className='lContainer' style={{marginLeft: '150px'}}>
            
            <span >Room Title</span>
                <input type="text" placeholder='Hotel Name' value={title} onChange={handleTitle} className='lInput'/>
                <span >Price</span>
                <input type="text" placeholder='Type' value={price} onChange={handlePrice} className='lInput'/>
                <span >Maximum People</span>
                <input type="number" placeholder='City' value={maxPeople} onChange={handleMaxPeople} className='lInput'/>
                {/* <span >Address</span>
                <input type="text" placeholder='Address' value={address} onChange={handleAddress} className='lInput'/> */}
            
            </div>

            <div className='lContainer' style={{marginLeft: '100px'}}>
            {/* <span >Title</span> */}
                {/* <input type="text" placeholder='Title' value={title} onChange={handleTitle} className='lInput'/> */}
                <span >Desc</span>
                <textarea  placeholder='Address' value={desc} onChange={handleDesc} rows={5} style={{width: '400px', fontSize: '19px'}}/>
                {/* <span >Cheapest Price</span>
                <input type="number" placeholder='Cheapest Price' value={cheapPrice} onChange={handlePrice} className='lInput'/> */}
                
   
            </div>
    </div>
    <button className="lButton"  onClick={handleClick}>Save</button><br></br>
    </div>
  )
}
