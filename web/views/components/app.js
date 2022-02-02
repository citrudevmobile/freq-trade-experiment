import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';

const App = () => {
  let [auth, setAuth] = useState(true)
  let [active, setActive] = useState(null)

  let navigate = useNavigate()
  

  let logout = function () {
    localStorage.clear()
    navigate('/')
  }
   
    let authenticate = async function () {
        let token = localStorage.getItem('token')
        if (token) {
          try {
            let response = await axios({
              method: "post",
              url: "/verify",
              headers: { "x-access-token": token },
            })
            
            localStorage.setItem("user", response.data.user)
            localStorage.setItem("active", response.data.active)
            localStorage.setItem("admin", response.data.admin)
            localStorage.setItem("auth", "true")
            
          } catch (error) {
            console.log(error)
            localStorage.setItem("auth", "false")
          }
        } else {
          localStorage.setItem("auth", "false")
        }
    }
  
    authenticate()
  
    return (
        <Routes>
        
            <Route
              path="/"
              element={<Home authenticate={authenticate} />}
            />

            <Route
              path="/register"
              element={<Register authenticate={authenticate}/>}
            />

            <Route
              path="/confirm-email-link/:token"
              element={<ConfirmEmail logout={logout} />}
            />

            <Route path="/dashboard" 
              element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="*" element={<Navigate to={ localStorage.getItem('auth') == 'true' ? "/dashboard": "/" }/>}  />

      </Routes>
    );
  };
  
  export default App;