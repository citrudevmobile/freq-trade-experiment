import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import axios from 'axios';


function Dashboard({ logout }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [allTrades, setAllTrades] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);

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
                let allTradeBots = response.data
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
                closedTrades.forEach(closedTrade => {
                    setTotalProfit(totalProfit + Number(closedTrade.profit_amount))
                });
                console.log(trades)
                setAllTrades(trades)
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

    useEffect(() => {
        console.log(allTrades)
    }, [allTrades])

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

                            <div class="flex items-center space-x-2 mb-4">
                                <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                                    <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                        <p>All Trades: <span class="text-green-700 mx-1">{allTrades.length}</span></p>
                                    </div>
                                </a>
                                <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800" href="javascript:void(0)">
                                    <div class="py-2 px-8 bg-indigo-50 text-indigo-700 rounded-full">
                                        <p>Total Profit: <span class="text-black mx-1">${totalProfit.toFixed(2)}</span></p>
                                    </div>
                                </a>
                            </div>

                            <ol class="relative border-l border-gray-200 dark:border-gray-700">
                                {allTrades.map((val, index) => {
                                    return (
                                        <li class="mb-10 ml-6">
                                            <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                            </span>
                                            <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{val.bot_name}<span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{val['close_date'] == undefined ? 'Trade Open:':'Trade Close:'} {val['close_date'] == undefined ? new Date(val.open_date).toLocaleString('en-US') : new Date(val['close_date']).toLocaleString('en-US')}</span></h3>

                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" class="px-4 py-3">
                                                            TRADE TYPE
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            Exchange
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            PAIR
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            STAKE AMOUNT
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            TRADED AMOUNT
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            RATE
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            PROFIT
                                                        </th>
                                                        <th scope="col" class="px-4 py-3">
                                                            PROFIT RATIO
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="bg-white dark:bg-gray-800">
                                                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {val['buy_tag'] == undefined ? 'Sell' : 'Buy'}
                                                        </td>
                                                        <td class="px-4 py-4">
                                                            {val.exchange}
                                                        </td>
                                                        <td class="px-4 py-4">
                                                            {val.pair}
                                                        </td>
                                                        <td class="px-4 py-4">
                                                            {val['stake_amount'] == undefined ? (Number(val.amount).toFixed(2)+' '+val.base_currency) :  (Number(val.stake_amount).toFixed(2)+' '+val.stake_currency) }
                                                        </td>
                                                        <td class="px-4 py-4">
                                                            {val['limit'] == undefined ? (Number(val.amount).toFixed(2)+' '+val.base_currency) : ((Number(val.amount) * Number(val['limit'])).toFixed(2)+' '+val.stake_currency)}
                                                        </td>
                                                        <td class="px-4 py-4">
                                                            {val['profit_ratio'] == undefined ? Number(val['open_rate']) : Number(val['limit'])}
                                                        </td>
                                                        <td className={"px-4 py-4 " + (val['gain'] == 'profit'? 'text-green-400' : 'text-red-400')}>
                                                            {val['profit_amount'] == undefined ? 'N/A' : Number(val['profit_amount']).toFixed(2)}
                                                        </td>
                                                        <td className={"px-4 py-4 " + (val['gain'] == 'profit'? 'text-green-400' : 'text-red-400')}>
                                                            {val['profit_ratio'] == undefined ? 'N/A' : Number(val['profit_ratio']).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    )
                                })}
                            </ol>

                        </div>

                    </div>
                </main>

            </div>
        </div>
    )

}

export default Dashboard
