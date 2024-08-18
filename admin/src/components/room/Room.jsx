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

export default function Rooms() {
  const navigate = useNavigate()
  const {data, loading, error, setData} = useFetch("rooms")
  const [targetUser, setTargetUser] = useState({})
  const handleDelete =(roomId)=>{
    if(window.confirm(`Are you sure to delete Note with id ${roomId}`)){
        axios.delete(`http://localhost:8800/api/rooms/${roomId}`)
        .then(response =>{
            setData(data.filter(room => room._id !== roomId))
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
        <Link to={`/newroom`}>
        <button className="lButton" >Add New</button>
        </Link>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>MaxPeople</th>
          <th>Room Numbers</th>
          <th>Action</th>
          {/* Add more table headers for additional columns */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.title}</td>
            <td>{row.price}</td>
            <td>{row.maxPeople}</td>
            <td><select id="rooms">
                  {row.roomNumbers.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.number}
                        </option>
                      ))}
                </select></td>
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
            {/* Render additional table cells for more columns */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}