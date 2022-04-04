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
                <input type="text" value={botName} onChange={e => setBotName(e.target.value)} class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BTC-BOT"/>
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
                    <div class="dropdown inline-block relative">
                      <button class="bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded inline-flex items-center">
                          Time Frame:
                          <span class="bg-blue-100 mx-2 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                            <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                                5m
                          </span>
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                      </button>
                      <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                        <li class=""><a class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
                        <li class=""><a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                        <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
                      </ul>
                    </div>
              </div>
            
              <div class="mt-8">
                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="floating_first_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Base Crypto Currency</label>
                  </div>
                  
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="floating_last_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quote Crypto Currency</label>
                  </div>
                </div>
              </div>


              <div class="relative z-0 mb-6 w-full group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_phone" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stake Amount</label>
              </div>

              <div class="flex justify-start">
              <div class="mb-3 xl:w-96">
                <select class="form-select appearance-none
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                    <option class="text-sm text-gray-300" selected>Select An Exchange</option>
                    <option value="1">Binance</option>
                    <option value="2">Kucoin</option>
                </select>
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
