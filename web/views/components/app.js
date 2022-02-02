import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';

const App = () => {
  let [auth, setAuth] = useState(null)
  let [active, setActive] = useState(null)

  let navigate = useNavigate()
  

  let logout = function () {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.setItem("auth", "false")
    setAuth(false)
    navigate('/')
  }
   
    let authenticate = async function () {
        let token = localStorage.token
        if (token) {
          try {
            let response = await axios({
              method: "post",
              url: "/verify",
              headers: { "x-access-token": localStorage.token },
            })
            
            localStorage.setItem("user", response.data.user)
            localStorage.setItem("auth", "true")
            setAuth(Boolean(localStorage.auth))
            setActive(Boolean(response.data.active))

          } catch (error) {
            setAuth(false)
            localStorage.setItem("auth", "false")
          }
          
        } else {
          setAuth(false)
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
              element={ auth ? ( active ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="*" element={<Navigate to={ auth ? "/dashboard": "/" }/>}  />

      </Routes>
    );
  };
  
  export default App;