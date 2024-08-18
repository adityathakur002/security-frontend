import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {  useState } from "react"
import './Table.css';

export default function Booking() {
  const navigate = useNavigate()
  const {data, loading, error, setData} = useFetch("bookings")
  const [targetUser, setTargetUser] = useState({})
  const handleDelete =(bookingId)=>{
    if(window.confirm(`Are you sure to delete Booking with id ${bookingId}`)){
        axios.delete(`http://localhost:8800/api/bookings/${bookingId}`)
        .then(response =>{
            setData(data.filter(book => book._id !== bookingId))
        }) 
        
    }
}
console.log(data)

const handleEdit = (userId)=>{
  navigate("/updateuser")
  const userToUpdate =data.filter(n => n._id === userId)
  setTargetUser(userToUpdate)
 
}
console.log(targetUser)
  console.log(data)
  return (
    
    <div>
        {/* <Link to={`/newroom`}>
        <button className="lButton" >Add New</button>
        </Link> */}
      <table className="styled-table">
      <thead>
        <tr>
          <th>User Id</th>
          <th>Room Id</th>
          <th>Hotel Id</th>
          <th>Booking Start</th>
          <th>Booking End</th>
          <th>Action</th>
          {/* Add more table headers for additional columns */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.user}</td>
            <td>{row.room}</td>
            <td>{row.hotel}</td>
            <td>{row.bookStart}</td>
            <td>{row.bookEnd}</td>
            
            <td>
            <Link to={`/updateroom/${row._id}`}>
            <IconButton  style={{color: "secondary"}} > 
                <EditIcon />
              </IconButton>
          </Link>
            
              { '  '}
              <IconButton  style={{color: "red"}} onClick={() => handleDelete(row._id)}>
                <DeleteIcon />
              </IconButton>
              
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}