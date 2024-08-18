import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Users from "./components/users/Users";
import Register from "./components/register/Register";
import Hotels from "./components/hotels/Hotels";
import UpdateHotel from "./components/hotels/UpdateHotel";
import AddHotel from "./components/hotels/AddHotel";
import Rooms from "./components/room/Room";
import UpdateRoom from "./components/room/UpdateRoom";
import AddRoom from "./components/room/AddRoom";
import Booking from "./components/booking/Booking";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/usersinfo" element={<Users/>}/>
          <Route path="/updateuser/:id" element={<Register/>}/>
          <Route path="/newhotel" element={<AddHotel/>}/>
          <Route path="/hotelsinfo" element={<Hotels/>}/>
          <Route path="/updatehotel/:id" element={<UpdateHotel/>}/>
          <Route path="/newroom" element={<AddRoom/>}/>
          <Route path="/roomsinfo" element={<Rooms/>}/>
          <Route path="/updateroom/:id" element={<UpdateRoom/>}/>
          <Route path="/bookinginfo" element={<Booking/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
