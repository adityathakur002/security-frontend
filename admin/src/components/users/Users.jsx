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

export default function Users() {
  const navigate = useNavigate()
  const {data, loading, error, setData} = useFetch("users")
  const [targetUser, setTargetUser] = useState({})
  const handleDelete =(userId)=>{
    if(window.confirm(`Are you sure to delete Note with id ${userId}`)){
        axios.delete(`http://localhost:8800/api/users/${userId}`)
        .then(response =>{
            setData(data.filter(note => note._id !== userId))
        }) 
        
    }
}

const handleEdit = (userId)=>{
  navigate("/updateuser")
  const userToUpdate =data.filter(n => n._id === userId)
  setTargetUser(userToUpdate)
 
}
console.log(targetUser)
  console.log(data)
  return (
    
    <div>
      <p>All users</p>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
          {/* Add more table headers for additional columns */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
            <td>
            <Link to={`/updateuser/${row._id}`}>
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
