import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import Tabs, { TabPane } from 'rc-tabs';
import axios from 'axios';


function Dashboard({ logout }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [listOfBots, setlistOfBots] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    let navigate = useNavigate()

    let callback = function(key) {};


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
                    data: { taskId: taskId }
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

                            <div class="border-b border-gray-200 dark:border-gray-700">
                                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    <li class="mr-2">
                                        <a href="#" class="active border-blue-600 text-blue-600 inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                            <svg class="mr-2 w-5 h-5 text-blue-600 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>Feed
                                        </a>
                                    </li>
                                    <li class="mr-2">
                                        <a href="#" class="inline-flex p-4 text-gray-600 rounded-t-lg border-b-2  dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                                            <svg class="mr-2 w-5 h-5  dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Exchanges
                                        </a>
                                    </li>
                                    <li class="mr-2">
                                        <a href="#" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                            <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Billing
                                        </a>
                                    </li>
                                </ul>
                            </div>

                           
<div class="h-screen flex flex-col items-center justify-center">
    
    <card class="w-1/2 flex flex-col mt-5">
      
      <header class="flex flex-row gap-3 items-center">
        <img src="https://picsum.photos/30/30" class="rounded-full" />
          <div> Stephan Tromer </div>
          <div class="text-sm text-gray-500"> Jan 13 </div>
      </header>
      
      <content class="grid grid-cols-4 gap-3">

        <div class="col-span-3 flex flex-col">
          <subject class="font-bold text-lg pt-3">
            Go (Golang) with Structs and Interfaces
          </subject>

          <description class="font-light text-sm pt-2">
            Although it would be possible for us to write programs only using Go’s built-in data types, at some point, it would become quite tedious. Consider a program that....
          </description>
        </div>
        
        <div class="flex items-center">
          <img src="https://picsum.photos/100/100" />
        </div>
        
      </content>
      
      <footer class="flex flex-row pt-7 gap-3 items-center">
        
        <button class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-full py-1 px-2 text-xs">
          Tutorial
        </button>
        
        <div class="text-gray-500 text-xs">
          7 min read
        </div>
        
        <div class="text-gray-500 text-xs">
          Based on your reading history
        </div>
        
      </footer>
     
      <hr class="mt-5"/>
      
    </card>
  
    <card class="w-1/2 flex flex-col mt-5">
      
      <header class="flex flex-row gap-3 items-center">
        <img src="https://picsum.photos/30/30" class="rounded-full" />
          <div> Stephan Tromer </div>
          <div class="text-sm text-gray-500"> Jan 13 </div>
      </header>
      
      <content class="grid grid-cols-4 gap-3">

        <div class="col-span-3 flex flex-col">
          <subject class="font-bold text-lg pt-3">
            Go (Golang) with Structs and Interfaces
          </subject>

          <description class="font-light text-sm pt-2">
            Although it would be possible for us to write programs only using Go’s built-in data types, at some point, it would become quite tedious. Consider a program that....
          </description>
        </div>
        
        <div class="flex items-center">
          <img src="https://picsum.photos/100/100" />
        </div>
        
      </content>
      
      <footer class="flex flex-row pt-7 gap-3 items-center">
        
        <button class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-full py-1 px-2 text-xs">
          Tutorial
        </button>
        
        <div class="text-gray-500 text-xs">
          7 min read
        </div>
        
        <div class="text-gray-500 text-xs">
          Based on your reading history
        </div>
        
      </footer>
     
      <hr class="mt-5"/>
      
    </card>
  
    <card class="w-1/2 flex flex-col mt-5">
      
      <header class="flex flex-row gap-3 items-center">
        <img src="https://picsum.photos/30/30" class="rounded-full" />
          <div> Stephan Tromer </div>
          <div class="text-sm text-gray-500"> Jan 13 </div>
      </header>
      
      <content class="grid grid-cols-4 gap-3">

        <div class="col-span-3 flex flex-col">
          <subject class="font-bold text-lg pt-3">
            Go (Golang) with Structs and Interfaces
          </subject>

          <description class="font-light text-sm pt-2">
            Although it would be possible for us to write programs only using Go’s built-in data types, at some point, it would become quite tedious. Consider a program that....
          </description>
        </div>
        
        <div class="flex items-center">
          <img src="https://picsum.photos/100/100" />
        </div>
        
      </content>
      
      <footer class="flex flex-row pt-7 gap-3 items-center">
        
        <button class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-full py-1 px-2 text-xs">
          Tutorial
        </button>
        
        <div class="text-gray-500 text-xs">
          7 min read
        </div>
        
        <div class="text-gray-500 text-xs">
          Based on your reading history
        </div>
        
      </footer>
     
      <hr class="mt-5"/>
      
    </card>
  
</div>

                            


                        </div>

                    </div>
                </main>

            </div>
        </div>
    )

}

export default Dashboard
