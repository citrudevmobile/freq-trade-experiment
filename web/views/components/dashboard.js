import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import swap from '../images/swap.svg';
import clock from '../images/clock1.svg';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

function Dashboard({ logout }) {

    let subtitle;

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [listOfBots, setlistOfBots] = useState([]);
    const [modalInfo, setModalInfo] = useState({})
    const [totalTrade, setTotalTrade] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)
    const [modalIsOpen, setIsOpen] = React.useState(false)

    let navigate = useNavigate()

    
    

    function openModal(val) {
        console.log('open modal called...')
        setIsOpen(true);
        setModalInfo(val)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal () {
        setIsOpen(false);
    }

    let getTradeBots = async function () {

        let token = localStorage.getItem('token')
        if (token) {
            try {
                let response = await axios({
                    method: "post",
                    url: "/get-tradebots",
                    headers: { "x-access-token": token }
                })
                let allTradeBots = response.data
                setlistOfBots(allTradeBots)
                let trades = []
                for (let bot of allTradeBots) {
                    let _trades = bot.trades.map(_trade => {
                        _trade.bot_name = bot.name
                        return _trade
                    })
                    trades = trades.concat(_trades)
                }
                trades = trades.sort(function (a, b) {
                    return new Date(b.open_date) - new Date(a.open_date);
                })
                
                let closedTrades = (trades.filter((val) => {return !(val['close_date'] == undefined)}))
                let totalTrades = closedTrades.reduce( (accumulator, val ) => {
                   return accumulator + Number(val['profit_amount'])
                }, 0);

                setTotalProfit(totalTrades)
                setTotalTrade(trades)

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
            navigate('/')
        }
    }

    useEffect(() => {
        getTradeBots()
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div>
                    <div class="w-full max-w-4xl h-full h-auto">

                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 class="text-xl flex items-center font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                    {modalInfo.name}
                                    <p class="bg-blue-700 ml-4 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">Bot</p>
                                </h3>
                                <button onClick={closeModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                            <div class="p-6 space-y-6">
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                </p>
                                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                </p>
                            </div>

                            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={() => {
                                    deleteTradeBot(modalInfo.taskId)
                                    setTimeout(() => {
                                        closeModal()
                                    }, 3000)
                                }} data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete Bot</button>
                                <button onClick={closeModal} data-modal-toggle="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

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
                                        {listOfBots.length}
                                    </div>

                                </div>
                            </div>
                            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                <div class="sm:flex items-center justify-between">
                                    <div class="flex items-center space-x-2">
                                        <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                                            <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                                <p>Total Profits: <span class="text-black mx-1">${totalProfit}</span><span class="text-green-700 mx-1">(+6.16%)</span></p>
                                            </div>
                                        </a>
                                        <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800" href="javascript:void(0)">
                                            <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                                <p>Total Trades: <span class="text-black mx-1">${totalTrade}</span></p>
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
                                                    Capital
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Change
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Time Frame
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Bot Profit
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Trades
                                                </th>
                                                <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Status
                                                </th>
                                                <th scope="col" class="relative py-3 px-6">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                                <th scope="col" class="relative py-3 px-6">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {listOfBots.map((val, index) => {
                                                return (
                                                    <tr key={index} tabindex="0" class="mb-3 focus:outline-none h-16 border border-gray-100 rounded">
                                                        <td>
                                                            <div class="ml-5">
                                                                <div class="bg-white rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                                    <img src={swap} class="object-contain" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="">
                                                            <div class="flex items-center pl-5">
                                                                <p class="text-base font-medium leading-none text-gray-700 mr-2">{val.recipe.exchange.pair_whitelist[0]}</p>
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
                                                                <p class="text-sm leading-none text-gray-600 ml-2">{val.recipe.available_capital}</p>
                                                            </div>
                                                        </td>
                                                        <td class="pl-5">
                                                            <div class="flex items-center">
                                                                <p class="text-sm leading-none text-green-600 ml-2">N/A</p>
                                                            </div>
                                                        </td>
                                                        <td class="pl-5">
                                                            <div class="flex items-center">
                                                                <div class="bg-white rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center ">
                                                                    <img src={clock} class="object-contain" />
                                                                </div>
                                                                <p class="text-sm leading-none text-gray-600 ml-2">{val.recipe.timeframe}</p>
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
                                                                <p class="text-sm leading-none text-gray-600 ml-2" ><span class="text-black">N/A</span></p>
                                                            </div>
                                                        </td>
                                                        <td class="flex justify-center items-center">
                                                            <button class="py-3 px-3 mt-3 text-base focus:outline-none leading-none text-black rounded">{val.trades.length}</button>
                                                        </td>
                                                        <td class="pl-4">
                                                            <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-green-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                                                {val.status ? 'Running' : 'Stopped'}
                                                                <span className={val.status == undefined ? '' : 'hidden'}>
                                                                    {<svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                    </svg>}
                                                                </span>
                                                            </button>
                                                        </td>
                                                        <td class="pl-1 flex items-center justify-center">
                                                            <button onClick={() => { startAndStop(val.taskId, val.status) }} class="">
                                                                <span className={val.status ? 'hidden' : ''}>{<i class="fas fa-play"></i>}</span>

                                                                <span className={val.status ? '' : 'hidden'}>{<i class="fas fa-stop"></i>}</span>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <div class="relative px-5 pt-2">

                                                                <button onClick={() => {
                                                                    openModal(val)
                                                                }} class="focus:ring-2 rounded-md focus:outline-none" role="button" aria-label="option">
                                                                    <svg class="dropbtn" onclick="dropdownFunction(this)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                        <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                        <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                        <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                    </svg>
                                                                </button>



                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}


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
