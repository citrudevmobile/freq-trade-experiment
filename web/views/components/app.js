import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';

const App = () => {
  
  let navigate = useNavigate()

  let logout = function () {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    localStorage.removeItem("active")
    localStorage.removeItem("auth")
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
            localStorage.setItem("admin", response.data.admin)
            localStorage.setItem('active', response.data.active)
            localStorage.setItem('auth', response.data.auth)
          }).catch (function (error) {
            localStorage.setItem("auth", "false")
          })
        } else {
          localStorage.setItem("auth", "false")
        }
    }

    useEffect(() => {
      authenticate()
      console.log('Auth: '+localStorage['auth'])
      console.log('Active: '+localStorage['active'])
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
              element={ localStorage['auth'] == 'true' ? ( localStorage['active'] == 'true' ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="*" element={<Navigate to={auth ? "/dashboard": "/" }/>}  />

      </Routes>
    );
  };
  
  export default App;