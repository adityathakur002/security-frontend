import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
;

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);

    
    
    const [room, setRoom] = useState(Object)
    const [hotel, setHotel] = useState(Object)
    const [activeUser, setActiveUser] = useState(Object)

    const {user} = useContext(AuthContext)

    useEffect(()=> {
      axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`)
      .then(response => {
          setHotel(response.data._id)
      })
  }, [])

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

      const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

      const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };
    const navigate = useNavigate()
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
        setRoom(value)
      };

      const [{endDate: value1, startDate: value2}] = dates;
    console.log(value1)
     console.log(dates)
     console.log(hotel)
     console.log(activeUser)

    //   const handleChange = (e) => {
    //     setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
    // }
    const handleRoom=(event) =>{setRoom(event.target.value)}
    const handleHotel=(event) =>{setHotel(event.target.value)}
    const handleUser=(event) =>{setActiveUser(event.target.value)}

      const handleClick = async () => {
        try {
          await Promise.all(
            selectedRooms.map((roomId) => {
              const res = axios.put(`/rooms/availability/${roomId}`, {
                dates: alldates,
              });
              return res.data;
            })
          );
          await axios.post(`/bookings`, {room: room, hotel: hotel, bookStart: value2, bookEnd: value1, user: user.details._id})
          // setOpen(false);
          // user.details._id.
          alert('Your Booking Successfully Done!!')
          navigate("/");
        } catch (err) {}
      };
      return (
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <input type="text" placeholder='Room' id='room' value={room} onChange={handleRoom} className='lInput' hidden/><br></br>
              <input type="text" placeholder='Hotel' id='hotel' value={hotel} onChange={handleHotel} className='lInput' hidden/><br></br>
              <input type="text" placeholder='Hotel' id='user' value={user.details._id} onChange={handleUser} className='lInput' hidden/><br></br>
              <input type="text" placeholder='StartDate' id='startdate' value={value2.toString()}  className='lInput' hidden/><br></br>
              <input type="text" placeholder='EndDate' id='enddate' value={value1.toString()}  className='lInput' hidden/><br></br>
              </div>
            
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
      );
}

export default Reserve
