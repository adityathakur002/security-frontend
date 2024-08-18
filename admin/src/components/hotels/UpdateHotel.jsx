import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

import "./hotel.css";
export default function UpdateHotel() {
    const location = useLocation()
  const id = location.pathname.split("/")[2];

  const [hotels,setHotels] = useState([])
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [cheapPrice, setCheapPrice] = useState(0)

  const navigate = useNavigate()

  useEffect(()=> {
    axios.get(`http://localhost:8800/api/hotels/find/${id}`)
    .then(response => {
        setHotels(response.data)
        setName(response.data.name)
        setType(response.data.type)
        setCity(response.data.city)
        setAddress(response.data.address)
        setTitle(response.data.title)
        setDesc(response.data.desc)
        setCheapPrice(response.data.cheapestPrice)
        // setEmail(response.data.email)
        // setPhone(response.data.phone)
    })
}, [])
const handleName =(event)=>setName(event.target.value)
const handleType =(event)=>setType(event.target.value)
const handleCity =(event)=>setCity(event.target.value)
const handleAddress =(event)=>setAddress(event.target.value)
const handleTitle =(event)=>setTitle(event.target.value)
const handleDesc =(event)=>setDesc(event.target.value)
const handlePrice =(event)=>setCheapPrice(event.target.value)
const handleClick = async(e) =>{
    e.preventDefault()
    
    if(window.confirm(`Are you sure to Update Hotels with id ${id}`)){
        axios.put(`http://localhost:8800/api/hotels/${id}`, {...hotels, name: name, type: type, city: city, address: address, title: title, desc: desc, cheapestPrice: cheapPrice })
        .then(response =>{
            setHotels(hotels.map(d => 
                d._id === id 
                ? response.data
                : d))
        }) 
        }
}

  return (
    <div>
        
        <span className='loginText'>Update Hotel</span><br></br>
    <div style={{display: 'flex'}}>
      <div style={{height: 200}}>
      
            </div>
            <div className='lContainer' style={{marginLeft: '150px'}}>
            
            <span >Hotel Name</span>
                <input type="text" placeholder='Hotel Name' value={name} onChange={handleName} className='lInput'/>
                <span >Hotel Type</span>
                <input type="text" placeholder='Type' value={type} onChange={handleType} className='lInput'/>
                <span >City</span>
                <input type="text" placeholder='City' value={city} onChange={handleCity} className='lInput'/>
                <span >Address</span>
                <input type="text" placeholder='Address' value={address} onChange={handleAddress} className='lInput'/>
            
            </div>

            <div className='lContainer' style={{marginLeft: '100px'}}>
            <span >Title</span>
                <input type="text" placeholder='Title' value={title} onChange={handleTitle} className='lInput'/>
                <span >Desc</span>
                <textarea  placeholder='Address' value={desc} onChange={handleDesc} rows={5} style={{width: '400px', fontSize: '19px'}}/>
                <span >Cheapest Price</span>
                <input type="number" placeholder='Cheapest Price' value={cheapPrice} onChange={handlePrice} className='lInput'/>
                
   
            </div>
    </div>
    <button className="lButton"  onClick={handleClick}>Save</button><br></br>
    </div>
  )
}
