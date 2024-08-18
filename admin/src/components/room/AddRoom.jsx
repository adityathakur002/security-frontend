import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


import "./Room.css";
export default function AddRoom() {
    const location = useLocation()
  const id = location.pathname.split("/")[2];

  const [room,setRoom] = useState([])
  const [hotel, setHotel] = useState('')
  const [roomNumbers, setRoomNumber] = useState(0)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [maxPeople, setMaxPeople] = useState(0)
  const [desc, setDesc] = useState('')

  const navigate = useNavigate()
  const {data, loading, error, setData} = useFetch("hotels")
  console.log(data)

//   useEffect(()=> {
//     axios.get(`http://localhost:8800/api/rooms/${id}`)
//     .then(response => {
//         setRoom(response.data)
//         setTitle(response.data.title)
//         setDesc(response.data.desc)
//         setPrice(response.data.price)
//         setMaxPeople(response.data.maxPeople)
//         // setEmail(response.data.email)
//         // setPhone(response.data.phone)
//     })
// }, [])
const handleTitle =(event)=>setTitle(event.target.value)
const handlePrice =(event)=>setPrice(event.target.value)
const handleHotel =(event)=>setHotel(event.target.value)
const handleMaxPeople =(event)=>setMaxPeople(event.target.value)
// const handleAddress =(event)=>setAddress(event.target.value)
// const handleTitle =(event)=>setTitle(event.target.value)
const handleDesc =(event)=>setDesc(event.target.value)
const handleRoomNumber =(event)=>setRoomNumber(event.target.value)
console.log(hotel)
const handleClick = async(e) =>{
    e.preventDefault()
      await axios.post(`http://localhost:8800/api/rooms/${hotel}`, {  title: title, price: price, maxPeople: maxPeople,  desc: desc, roomNumbers: roomNumbers})
        .then(response =>{
          window.alert("Room Added")
      })      
}

  return (
    <div>
        
        <span className='loginText'>Update Hotel</span><br></br>
    <div style={{display: 'flex'}}>
      <div style={{height: 200}}>
      
            </div>
            <div className='lContainer' style={{marginLeft: '150px'}}>

            <span >Hotel</span>
                <div >
                
                <select id="dropdown" value={hotel} onChange={handleHotel}  style={{width: '422px', height: '40px' ,fontSize:'18px'}}>
                    <option value="">Select Hotel...</option>
                    {data.map((hotel)=>(
                    <option value={hotel._id} >{hotel.name}</option>
                    ))} 
                </select>
                {/* <p>Selected option: {hotel}</p> */}
               
                </div>
            
            <span >Room Title</span>
                <input type="text" placeholder='Room Title' value={title} onChange={handleTitle} className='lInput'/>
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
                <textarea  placeholder='Description' value={desc} onChange={handleDesc} rows={5} style={{width: '400px', fontSize: '19px'}}/>
                <span >RoomNumber</span>
                <input type="number" placeholder='RoomNumber' value={roomNumbers} onChange={handleRoomNumber} className='lInput'/>
                
   
            </div>
    </div>
    <button className="lButton"  onClick={handleClick}>Add</button><br></br>
    </div>
  )
}
