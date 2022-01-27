import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./home";
import Dashboard from "./dashboard";
import Register from './register';

const App = () => {
    const [auth, setAuth] = useState(true);
  
    useEffect(() => {
    /*
      let user = localStorage.getItem("user");
      user && JSON.parse(user) ? setAuth(true) : setAuth(false);
    */
      setAuth(true)
    }, []);
  
    useEffect(() => {
      localStorage.setItem("user", auth);
    }, [auth]);
  
    return (
        <Routes>
        
        {!auth && (
         <>
         <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register authenticate={() => setAuth(true)}/>}
          />
         </>
        )}
  
        {auth && (
          <>
            <Route path="/dashboard" element={<Dashboard authenticate={() => setAuth(true)} />} />
          </>
        )}

        <Route path="/register" element={<Navigate to="/register" />} />
        <Route path="/dashboard" element={<Navigate to={auth ? "/dashboard" : "/"} />} />
        <Route path="*" element={<Navigate to={auth ? "/dashboard" : "/"} />} />

      </Routes>
    );
  };
  
  export default App;