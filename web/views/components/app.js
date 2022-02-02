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
    setAuth(false)
    navigate('/')
  }
   
    let authenticate = function () {
        let token = localStorage.token
        if (token) {
          axios({
            method: "post",
            url: "/verify",
            headers: { "x-access-token": localStorage.token },
          }).then(function (response) {
            localStorage.setItem("user", response.data.user)
            setAuth(response.data.auth)
            setActive(response.data.active)
          }).catch (function (error) {
            setAuth(false)
          })
        } else {
          setAuth(false)
        }
    }

    useEffect(() => {
      authenticate()

    }, [])
  
    useEffect(() => {
      console.log(localStorage['auth'])
      console.log('auth has changed...')
    }, [localStorage['auth']])
    
  
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