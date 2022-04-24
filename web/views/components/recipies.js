import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import testTubeImg from '../images/testtube.png';
import axios from 'axios';


function Dashboard({ logout }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [listOfBots, setlistOfBots] = useState([]);
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
                setlistOfBots(response.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            navigate('/')
        }
    }

    let deleteTradeBot = async function (taskId) {
        let token = localStorage.getItem('token')
        if (token) {
            try {
                await axios({
                    method: "post",
                    url: "/delete-tradebot",
                    headers: { "x-access-token": token },
                    data: { taskId: taskId }
                })
                await getTradeBots()
            } catch (error) {
                console.log(error)
            }
        } else {
            navigate('/')
        }
    }

    let startAndStop = async function (taskId, status) {
        console.log(taskId)
        let token = localStorage.getItem('token')
        if (token) {
            if (status) {
                try {
                    await axios({
                        method: "post",
                        url: "/stop-tradebot",
                        headers: { "x-access-token": token },
                        data: {
                            taskId: taskId
                        }
                    })
                    await getTradeBots()
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    await axios({
                        method: "post",
                        url: "/start-tradebot",
                        headers: { "x-access-token": token },
                        data: {
                            taskId: taskId
                        }
                    })
                    await getTradeBots()
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            //navigate('/')
        }
    }

    useEffect(() => {
        //getTradeBots()
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

                            <div class="sm:flex items-center justify-between mb-8">
                                <div class="flex items-center space-x-2">
                                    <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                                        <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                            <p>Recipies: 100</p>
                                        </div>
                                    </a>
                                    <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                                        <div class="flex justify-center items-center">
                                            <div class="xl:w-96">
                                                <div class="input-group relative flex flex-wrap items-stretch w-full">
                                                    <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />

                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <NavLink end to="/create-recipe" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                    <p class="text-sm font-medium leading-none text-white">Create Recipe</p>
                                </NavLink>
                            </div>

                            <article class="md:gap-8 md:grid md:grid-cols-3 mb-4 rounded-lg border shadow-md p-10">
                                <div>
                                    <div class="flex items-center mb-6 space-x-4">
                                        <img class="w-10 h-10 rounded-lg" src={testTubeImg} alt="" />
                                        <div class="space-y-1 font-medium dark:text-white">
                                            <p>Recipe#1134</p>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Created: <time datetime="2022-01-20 19:00">January 20, 2022</time></p>
                                        </div>
                                    </div>
                                    <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                        <li class="flex items-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Profits: $120<span class="text-green-700 mx-1">(+6.16%)</span></li>
                                        <li class="flex items-center"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>Trades: 10</li>
                                        <li class="flex items-center"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>Following: 5</li>
                                        <li class="flex items-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>Clones: 5</li>
                                    </ul>
                                </div>
                                <div class="col-span-2 mt-6 md:mt-0">
                                    <div class="flex items-start mb-5">
                                        <div class="pr-4">
                                            <footer>

                                            </footer>
                                            <h4 class="text-xl font-bold text-gray-900 dark:text-white">ETH/BTC</h4>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Maintained by @dousou</p>
                                        </div>
                                        <p class="bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">Paper Trade</p>
                                    </div>
                                    <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Your strategy performance is influenced by your buy strategy, your sell strategy, and also by the minimal_roi and stop_loss you have set.</p>

                                    <aside class="flex items-center mt-3 space-x-5">

                                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Folllow
                                            </span>
                                        </button>


                                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Clone
                                            </span>
                                        </button>

                                    </aside>
                                </div>
                            </article>

                            <article class="md:gap-8 md:grid md:grid-cols-3 mb-4 rounded-lg border shadow-md p-10">
                                <div>
                                    <div class="flex items-center mb-6 space-x-4">
                                        <img class="w-10 h-10 rounded-lg" src={testTubeImg} alt="" />
                                        <div class="space-y-1 font-medium dark:text-white">
                                            <p>Recipe#1154</p>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Created: <time datetime="2022-01-20 19:00">Feburary 5,  2022</time></p>
                                        </div>
                                    </div>
                                    <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                        <li class="flex items-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Profits: $100<span class="text-green-700 mx-1">(+3.10%)</span></li>
                                        <li class="flex items-center"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>Trades: 23</li>
                                        <li class="flex items-center"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>Following: 10</li>
                                        <li class="flex items-center"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>Clones: 20</li>
                                    </ul>
                                </div>
                                <div class="col-span-2 mt-6 md:mt-0">
                                    <div class="flex items-start mb-5">
                                        <div class="pr-4">
                                            <footer>

                                            </footer>
                                            <h4 class="text-xl font-bold text-gray-900 dark:text-white">JASMY/BUSD</h4>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Maintained by @dousou</p>
                                        </div>
                                        <p class="bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">Paper Trade</p>
                                    </div>
                                    <p class="mb-2 font-light text-gray-500 dark:text-gray-400">Your strategy performance is influenced by your buy strategy, your sell strategy, and also by the minimal_roi and stop_loss you have set.</p>

                                    <aside class="flex items-center mt-3 space-x-5">

                                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Folllow
                                            </span>
                                        </button>

                                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Clone
                                            </span>
                                        </button>

                                    </aside>
                                </div>
                            </article>

                        </div>

                    </div>
                </main>

            </div>
        </div>
    )

}

export default Dashboard
