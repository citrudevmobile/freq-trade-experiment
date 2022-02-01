import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';

const App = () => {
  const [auth, setAuth] = useState(null)
  let navigate = useNavigate()
   
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
            localStorage.setItem("active", response.data.active)
            if (localStorage.user) {
              console.log(localStorage)
              setAuth(true)
            }
          }).catch (function (error) {
            console.log(error)
            setAuth(false)
          })
        } else {
          setAuth(false)
        }
    }

    let logout = function () {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      localStorage.removeItem("active")
      setAuth(false)
    }
  
    useEffect(() => {
      authenticate()
    }, [])
  
    useEffect(() => {
      if (auth && localStorage.token && localStorage.user) {
        console.log(window.location.pathname)
        navigate(window.location.pathname)
      } else {
        navigate('/')
      }
    }, [auth])
  
    return (
        <Routes>
        
        {!auth && (
          <>
            <Route
              path="/"
              element={<Home authenticate={authenticate} />}
            />

            <Route
              path="/register"
              element={<Register authenticate={authenticate}/>}
            />

            <Route
              path="/confirm-email-link"
              element={<ConfirmEmail />}
            />
         </>
        )}
      
  
        {auth && (
          <>

            <Route path="/dashboard" 
            element={ localStorage.active =='true' ? <Dashboard authenticate={authenticate} logout={logout} /> :  <SendConfirmEmail authenticate={authenticate} logout={logout} /> } 
            />

          </>
        )}
        
        
        <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/"} />}  />

      </Routes>
    );
  };
  
  export default App;