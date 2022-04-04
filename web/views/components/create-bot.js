import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardCard05 from './dashboard/Dashboard05';
import axios from 'axios';


function Dashboard ({logout}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [botName, setBotName] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    
  }, [])

  let createBot = async function () {
    let token = localStorage.getItem('token')
    if (token) {
      if (botName) {
        try {
          await axios({
            method: "post",
            url: "/create-tradebot",
            headers: { "x-access-token": token },
            data: { 
              name: botName 
            }
          })
          navigate('/dashboard')
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Please input a name for the bot')
      }
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            
            <div class="p-4 m-4 max-w-4xl bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                General
            </h5>
            
             <div>
              <div class="flex">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Bot Name
                </span>
                <input type="text" value={botName} onChange={e => setBotName(e.target.value)} class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="My Bot"/>
              </div>
            </div>

            <div class="mt-6">
              <label for="toggle-example-checked" class="flex relative items-center mb-4 cursor-pointer">
                <input type="checkbox" id="toggle-example-checked" class="sr-only" checked/>
                <div class="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Paper Trade</span>
              </label>
            </div>
            
              <div class="mt-6">
                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="floating_first_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quote Currency</label>
                  </div>
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="floating_last_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stake Currency</label>
                  </div>
                </div>
              </div>
            </div>

          <div class="p-4 m-4 max-w-4xl bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Selling
            </h5>
            
          </div>

          <div class="p-4 m-4 max-w-4xl bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Buying
            </h5>
            
          </div>

      <div class="inline-flex m-4 rounded-md shadow-sm" role="group">
        <NavLink end to="/dashboard" type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
          Back
        </NavLink>
       
        <button onClick={createBot} type="button" class="py-2 px-4 text-sm bg-blue-500 font-medium text-white bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
          Create Bot
        </button>

      </div>

          </div>
        </main>
      </div>
    </div>
  )

  }

  export default Dashboard
