import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';


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
            console.log(response.data)
            localStorage.setItem("user", response.data.user)
            if (localStorage.user) {
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
      setAuth(false)
    }
  
    useEffect(() => {
      authenticate()
    }, [])
  
    useEffect(() => {
      if (auth && localStorage.token && localStorage.user) {
        navigate('/dashboard')
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
         </>
        )}
  
        {auth && (
          <>
            <Route path="/dashboard" element={<Dashboard authenticate={authenticate} logout={logout} />} />
          </>
        )}

        <Route path="/register" element={<Navigate to="/register" />} />
        <Route path="/dashboard" element={<Navigate to={auth ? "/dashboard" : "/"} />} />
        <Route path="*" element={<Navigate to="/" />}  />

      </Routes>
    );
  };
  
  export default App;