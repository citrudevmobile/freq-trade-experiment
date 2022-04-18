import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Home from "./home";
import Dashboard from "./dashboard";
import CreateBot from "./create-bot"
import Register from './register';
import SendConfirmEmail from './sendConfirmEmail';
import ConfirmEmail from './confirmEmail';
import TradeHistory from './trade-history'
import Settings from './settings'
import Trade from './trade'
import Strategies from './strategies'

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
               element={ <Dashboard logout={logout} /> } 
               //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Dashboard logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/history" 
              element={ <TradeHistory logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <TradeHistory logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/create-bot" 
              element={ <CreateBot  logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <CreateBot  logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/trade" 
              element={ <Trade logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Trade logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/strategies" 
              element={ <Strategies logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Strategies logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="/settings" 
              element={ <Settings logout={logout} /> } 
              //element={ localStorage.getItem('auth') == 'true' ? ( localStorage.getItem('active') == 'true'  ? <Settings logout={logout} /> : <SendConfirmEmail logout={logout} /> ) : <Navigate to="/"/> } 
            />

            <Route path="*" element={<Navigate to={ localStorage.getItem('auth') == 'true' ? "/dashboard": "/" }/>}  />

      </Routes>
    );
  };
  
  export default App;