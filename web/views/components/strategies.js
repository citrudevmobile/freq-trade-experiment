import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardCard05 from './dashboard/Dashboard05';
import swap from '../images/swap.svg';
import clock from '../images/clock1.svg';
import axios from 'axios';


function Dashboard ({logout}) {

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
            //navigate('/')
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
                        data: {taskId: taskId}
                    })
                    await getTradeBots()
                } catch (error) {
                    console.log(error)
                }
            } else {
                //navigate('/')
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

                <h1>Strategy Page</h1>
            </div>
    
          </div>
        </main>

      </div>
    </div>
  )

  }

  export default Dashboard
