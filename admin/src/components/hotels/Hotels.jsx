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

export default function Hotels() {
  const navigate = useNavigate()
  const {data, loading, error, setData} = useFetch("hotels")
  const [targetUser, setTargetUser] = useState({})
  const handleDelete =(hotelId)=>{
    if(window.confirm(`Are you sure to delete Note with id ${hotelId}`)){
        axios.delete(`http://localhost:8800/api/hotels/${hotelId}`)
        .then(response =>{
            setData(data.filter(hotel => hotel._id !== hotelId))
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
        <Link to={`/newhotel`}>
        <button className="lButton" >Add New</button>
        </Link>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Cheapest Price</th>
          <th>Action</th>
          {/* Add more table headers for additional columns */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.name}</td>
            <td>{row.city}</td>
            <td>{row.address}</td>
            <td>{row.cheapestPrice}</td>
            <td>
            <Link to={`/updatehotel/${row._id}`}>
            <IconButton  style={{color: "secondary"}} > 
                <EditIcon />
              </IconButton>
          </Link>
            
              { '  '}
              <IconButton  style={{color: "red"}} onClick={() => handleDelete(row._id)}>
                <DeleteIcon />
              </IconButton>
              
              </td>
            {/* Render additional table cells for more columns */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}