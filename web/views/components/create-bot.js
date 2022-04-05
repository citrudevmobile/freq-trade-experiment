import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import WelcomeBanner from './dashboard/WelcomeBanner';
import DashboardCard05 from './dashboard/Dashboard05';
import axios from 'axios';


function Dashboard ({logout}) {

  let [sidebarOpen, setSidebarOpen] = useState(false);
  let [botName, setBotName] = useState("")
  let [paperTrade, setPaperTrade] = useState(true);
  let [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  let [quoteCurrency, setQuoteCurrency] = useState("")
  let [baseCurrency, setBaseCurrency] = useState("")
  let [stakeAmount, setStakeAmount] = useState(0)
  let [availableCapital, setAvailableCapital] = useState(0)
  const toggleClass = "transform translate-x-6 bg-red-300";

  let navigate = useNavigate()

  useEffect(() => {
    console.log(quoteCurrency)
    console.log(baseCurrency)
    console.log(selectedTimeFrame)
    console.log(stakeAmount)
    console.log(availableCapital)
  }, [quoteCurrency, baseCurrency, selectedTimeFrame, stakeAmount, availableCapital])

  function handleSelectChange(event) {
    setSelectedTimeFrame(event.target.value)
    console.log(selectedTimeFrame)
  }

  let createBot = async function () {
    let token = localStorage.getItem('token')
    let botNameVal = botName.split(" ").join("-")
    console.log('showing values...')
    console.log(quoteCurrency)
    console.log(baseCurrency)
    console.log(selectedTimeFrame)
    console.log(stakeAmount)
    console.log(availableCapital)
    if (token) {
      if (botNameVal && quoteCurrency && baseCurrency && selectedTimeFrame && stakeAmount && availableCapital) {
        try {
          await axios({
            method: "post",
            url: "/create-tradebot",
            headers: { "x-access-token": token },
            data: { 
              name: botNameVal,
              quoteCurrency: quoteCurrency,
              baseCurrency: baseCurrency,
              timeframe: selectedTimeFrame,
              stakeAmount: stakeAmount,
              availableCapital: availableCapital,
            }
          })
          navigate('/dashboard')
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Please input valid values for the bot')
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
                    <div className="flex items-center justify-start ">
                    <label for="toggleB" class="flex items-center cursor-pointer">
                        {/*   Switch Container */}
                        <div
                          className="w-14 h-8 flex items-center bg-gray-600 rounded-full p-1 cursor-pointer"
                          onClick={() => {
                            setPaperTrade(!paperTrade);
                          }}
                        >
                          {/* Switch */}
                          <div
                            className={
                              "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
                              (paperTrade ? toggleClass : null)
                            }
                          ></div>
                        </div>
                        <div class="ml-3 text-gray-700 font-medium" >
                            Paper Trade
                          </div>
                        </label>
                    </div>
                </div>
              <div class="mt-6">
                    <div class="dropdown inline-block relative">
                      <button class="bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded inline-flex items-center">
                        <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                          Time Frame:
                        <select value={selectedTimeFrame} onChange={handleSelectChange} class="bg-gray-300 text-gray-700 text-sm mx-2 px-8 rounded inline-flex items-center">
                          <option value="1m" selected>1m</option>
                          <option value="5m">5m</option>
                          <option value="15m">15m</option>
                          <option value="30m">30m</option>
                          <option value="1h">1hr</option>
                        </select>
                      </button>
                    </div>
              </div>
            
              <div class="mt-8">
                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)} name="base_currency" id="base_currency" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="base_currency" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Base Currency</label>
                  </div>
                  
                  <div class="relative z-0 mb-6 w-full group">
                      <input type="text" value={quoteCurrency} onChange={e => setQuoteCurrency(e.target.value)} name="quote_currency"  id="quote_currency" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label for="quote_currency" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quote Currency</label>
                  </div>
                </div>
              </div>


              <div class="relative z-0 mb-6 w-full group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} name="stake_amount" id="stake_amount" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                  <label for="stake_amount" class="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stake Amount ( Amount of crypto-currency your bot will use for each trade )</label>
              </div>

              <div class="relative z-0 mb-6 w-full group">
                  <input type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={availableCapital} onChange={e => setAvailableCapital(e.target.value)} name="available_capital" id="available_capital" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                  <label for="available_capital" class="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Available Capital ( Available starting capital for the bot. )</label>
              </div>

              <div class="flex justify-start">
              <div class="mb-3 xl:w-96">
                <select class="form-select appearance-none
                  block
                  w-full
                  px-10
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
