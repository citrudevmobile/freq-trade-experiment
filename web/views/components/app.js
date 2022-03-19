import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import CreateBot from "./create-bot"
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';

const App = () => {
  
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
    console.log('auth: '+localStorage.getItem('auth'))
    console.log('active: '+localStorage.getItem('active'))
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
              element={<ConfirmEmail authenticate={authenticate} />}
            />

            <Route path="/dashboard" 
               //element={ <Dashboard logout={logout} /> } 
              element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/trade-history" 
              //element={ <Dashboard logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/create-bot" 
              // element={ <CreateBot  logout={logout} /> } 
              element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <CreateBot  logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/edit-bot" 
              //element={ <Dashboard logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="*" element={<Navigate to={ localStorage.getItem('auth') == 'true' ? "/dashboard": "/" }/>}  />

      </Routes>
    );
  };
  
  export default App;