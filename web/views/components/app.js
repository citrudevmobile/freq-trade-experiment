import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';
import ConfirmEmail from './confirmEmail';



const App = () => {

   
  const [auth, setAuth] = useState(false)
  let navigate = useNavigate()

    let authenticate = function (cb) {
        let token = localStorage.token
        console.log('authenticate called...')
        console.log(token)
        if (token) {
          axios({
            method: "post",
            url: "/verify",
            headers: { "x-access-token": localStorage.token },
          }).then(function (response) {
            console.log(response.data)
            localStorage.setItem("user", response.data.user)
            localStorage.setItem("admin", response.data.admin)
            localStorage.setItem("active", response.data.active)
            localStorage.setItem("auth", response.data.auth)
            cb()
          }).catch (function (error) {
            localStorage.setItem("auth", "false")
          })
        } else {
          localStorage.setItem("auth", "false")
        }
    }

    let logout = function () {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      localStorage.removeItem("active")
      localStorage.removeItem("auth")
    }
  
    useEffect(() => {
      authenticate()
    }, [])
  
    useEffect(() => {
      console.log('called useEffect...')
      if (localStorage.auth == 'true' && localStorage.token && localStorage.user) {
        navigate(window.location.pathname)
      } else {
        navigate('/')
      }
    }, [localStorage.auth])
  
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
        
         </>
        )}
  
        {auth && (
          <>
            <Route path="/dashboard" 
            element={ localStorage.active == 'true' ? <Dashboard authenticate={authenticate} logout={logout} /> :  <ConfirmEmail authenticate={authenticate} logout={logout} /> } 
            />
          </>
        )}
       
        <Route path="*" element={<Navigate to={localStorage.auth == 'true'  ? "/dashboard" : "/"} />}  />

      </Routes>
    );
  };
  
  export default App;