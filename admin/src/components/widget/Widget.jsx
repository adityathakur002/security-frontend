import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from 'axios';
import { useEffect, useState } from "react";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;
  const [users, setUsers] = useState(0)
  const [hotels, setHotels] = useState(0)
  const [room, setRoom] = useState(0)
  const [book, setBook] = useState(0)

  useEffect(()=> {
    axios.get(`http://localhost:8800/api/hotels/countAll`)
    .then(response => {
        setHotels(response.data)
    })
}, [])
useEffect(()=> {
  axios.get(`http://localhost:8800/api/users/count/user`)
  .then(response => {
      setUsers(response.data)
  })
}, [])
useEffect(()=> {
  axios.get(`http://localhost:8800/api/hotels/countRoom`)
  .then(response => {
      setRoom(response.data)
  })
}, [])

useEffect(()=> {
  axios.get(`http://localhost:8800/api/bookings/countBooking`)
  .then(response => {
      setBook(response.data)
  })
}, [])
// console.log(count)

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        count: users,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        count: book,
        link: "View all Bookings",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "HOTELS",
        isMoney: false,
        count: hotels,
        link: "View Hotels",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "ROOM",
        isMoney: false,
        count: room,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "RS."} {data.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
