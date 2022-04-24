import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardCard05 from './dashboard/Dashboard05';
import swap from '../images/swap.svg';
import clock from '../images/clock1.svg';
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

                            <h1>Recipies Page</h1>

                            <div class="flex items-center mb-5">
                                <p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">8.7</p>
                                <p class="ml-2 font-medium text-gray-900 dark:text-white">Excellent</p>
                                <span class="mx-2 w-1 h-1 bg-gray-900 rounded-full dark:bg-gray-500"></span>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">376 reviews</p>
                                <a href="#" class="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read all reviews</a>
                            </div>
                            <div class="gap-8 sm:grid sm:grid-cols-2">
                                <div>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Staff</dt>
                                        <dd class="flex items-center mb-3">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 88%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Comfort</dt>
                                        <dd class="flex items-center mb-3">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 89%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Free WiFi</dt>
                                        <dd class="flex items-center mb-3">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 88%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Facilities</dt>
                                        <dd class="flex items-center">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 54%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">5.4</span>
                                        </dd>
                                    </dl>
                                </div>
                                <div>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Value for money</dt>
                                        <dd class="flex items-center mb-3">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 89%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Cleanliness</dt>
                                        <dd class="flex items-center mb-3">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 70%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">7.0</span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                                        <dd class="flex items-center">
                                            <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                                <div class="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style="width: 89%"></div>
                                            </div>
                                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
                                        </dd>
                                    </dl>
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
