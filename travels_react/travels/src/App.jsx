
import React, { useState } from "react";
import RegisterForm from "./duplicateComponents/RegisterForm";
import LoginForm from "./duplicateComponents/loginForm";

import { Route, Routes } from "react-router-dom";
import BusList from "./duplicateComponents/BusList";
import BusSeats from "./duplicateComponents/BusSeats";
import UserBookings from "./duplicateComponents/UserBookings";
import Wrapper from "./duplicateComponents/Wrapper";
import About from './components/About';

const App =() => {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(localStorage.getItem('userId'))


  const handleLogin = (newToken, user_id) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('userId', user_id)
    setToken(newToken)
    setUserId(user_id)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken(null)
    setUserId(null)
  }

  return(
    <div>
      {/* < Wrapper handleLogout= {handleLogOut} token={token}>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="bus/:busId" element={<BusSeats token={token}/>} />
          <Route path="my-bookings" element={< UserBookings token={token} userId={userId} />} />
        </Routes>
      </Wrapper> */}

      < Wrapper handleLogout= {handleLogOut} token={token}>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="bus/:busId" element={<BusSeats token={token}/>} />
          <Route path="/my-bookings" element={< UserBookings token={token} userId={userId} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Wrapper>

    </div>
  )
}

export default App