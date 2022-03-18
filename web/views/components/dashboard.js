import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardCard05 from './dashboard/Dashboard05';
import swap from '../images/swap.svg';
import clock from '../images/clock1.svg';


function Dashboard ({logout}) {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  let navigate = useNavigate()

  let getTradeBots = async function () {
    let token = localStorage.getItem('token')
        if (token) {
            try {
                let response = await axios({
                    method: "post",
                    url: "/get-tradebots",
                    headers: { "x-access-token": token }
                })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            navigate('/')
        }
    }

  useEffect(() => {
    getTradeBots()
  }, [])

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

          <div class="sm:px-6 w-full">

            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Bots</p>
                    <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        1
                    </div>
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                <p>Total Bot Profits: <span class="text-black mx-1">$100</span><span class="text-green-700 mx-1">(+6.16%)</span></p>
                            </div>
                        </a>
                        <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800" href="javascript:void(0)">
                            <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                <p>Total Value: <span class="text-black mx-1">$1000</span></p>
                            </div>
                        </a>
                    </div>
                    
                    <NavLink end to="/create-bot" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <p class="text-sm font-medium leading-none text-white">Create Bot</p>
                    </NavLink>
                </div>
                <div class="mt-7 overflow-x-auto">
               
                    <table class="w-full whitespace-nowrap">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Pair
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Value
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Change
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Trade Time
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Bot Profit
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Transactions
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Status
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Options
                            </th>
                            <th scope="col" class="relative py-3 px-6">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                       
                            <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
                                <td>
                                    <div class="ml-5">
                                        <div class="bg-white rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                            <img src={swap} class="object-contain" />
                                        </div>
                                    </div>
                                </td>
                                <td class="">
                                    <div class="flex items-center pl-5">
                                        <p class="text-base font-medium leading-none text-gray-700 mr-2">ETH/USDT</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676" stroke="#3B82F6" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333" stroke="#3B82F6" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </td>
                                <td class="pl-2">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></circle>
                                        </svg>
                                        <p class="text-sm leading-none text-gray-600 ml-2">$1000</p>
                                    </div>
                                </td>
                                <td class="pl-5">
                                    <div class="flex items-center">
                                        <p class="text-sm leading-none text-green-600 ml-2">0.35%</p>
                                    </div>
                                </td>
                                <td class="pl-5">
                                    <div class="flex items-center">
                                        <div class="bg-white rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center ">
                                            <img src={clock} class="object-contain" />
                                        </div>
                                        <p class="text-sm leading-none text-gray-600 ml-2">14m</p>
                                    </div>
                                </td>
                                <td class="pl-5">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                                stroke="#52525B"
                                                stroke-width="1.25"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>
                                        </svg>
                                        <p class="text-sm leading-none text-gray-600 ml-2" ><span class="text-black">$1000</span><span class="text-green-700 mx-1">(+6.16%)</span></p>
                                    </div>
                                </td>
                                <td class="pl-5 flex justify-center items-center">
                                    <button class="py-3 px-3 mt-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">15</button>
                                </td>
                                <td class="pl-4">
                                    <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-green-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">Active</button>
                                </td>
                                <td>
                                    <div class="relative px-5 pt-2">
                                        <button class="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
                                            <svg class="dropbtn" onclick="dropdownFunction(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </button>
                                        <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                                            <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                <p>Edit</p>
                                            </div>
                                            <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                <p>Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="h-3"></tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        

          </div>
        </main>

      </div>
    </div>
  )

  }

  export default Dashboard
