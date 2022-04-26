import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Sidebar from './dashboard/Sidebar'
import Header from './dashboard/Header';
import axios from 'axios';


function Dashboard({ logout }) {

  let [sidebarOpen, setSidebarOpen] = useState(false);
  let [botName, setBotName] = useState("")
  let [paperTrade, setPaperTrade] = useState(true);
  let [selectedTimeFrame, setSelectedTimeFrame] = useState("5m");
  let [selectedPair, setSelectedPair] = useState("");
  let [selectedBuyOrderBookPrice, setSelectedBuyOrderBookPrice] = useState(1)
  let [selectedSellOrderBookPrice, setSelectedSellOrderBookPrice] = useState(1)
  let [stakeAmount, setStakeAmount] = useState(0)
  let [roiImmediate, setRoiImmediate] = useState(1)
  let [roiTenMin, setRoiTenMin] = useState(1)
  let [roiTwentyMin, setRoiTwentyMin] = useState(1)
  let [roiThirtyMin, setRoiThirtyMin] = useState(1)
  let [roiFourtyMin, setRoiFourtyMin] = useState(1)
  let [roiFiftyMin, setRoiFiftyMin] = useState(1)
  let [roiSixtyMin, setRoiSixtyMin] = useState(1)
  let [roiTwoHr, setRoiTwoHr] = useState(1)
  let [roiThreeHr, setRoiThreeHr] = useState(1)
  let [roiFourHr, setRoiFourHr] = useState(1)
  let [roiFiveHr, setRoiFiveHr] = useState(1)
  let [roiSixHr, setRoiSixHr] = useState(1)
  let [roiSevenHr, setRoiSevenHr] = useState(1)
  let [roi24Hr, setRoi24Hr] = useState(1)
  let [stopLoss, setStopLoss] = useState(1)
  let [availableCapital, setAvailableCapital] = useState(0)

  const toggleClass = "transform translate-x-6 bg-red-300";

  let navigate = useNavigate()

  useEffect(() => {

    console.log(roiImmediate)

  }, [roiImmediate, selectedTimeFrame, stakeAmount, availableCapital])

  function handleSelectChange(event) {
    setSelectedTimeFrame(event.target.value)
  }

  function handleSelectPair(event) {
    setSelectedPair(event.target.value)
  }

  function handleBuyOrderBookPrice(event) {
    setSelectedBuyOrderBookPrice(event.target.value)
  }

  function handleSellOrderBookPrice(event) {
    setSelectedSellOrderBookPrice(event.target.value)
  }

  function handleRoiImmediate(event) {
    setRoiImmediate(event.target.value)
  }




  let createBot = async function () {
    let token = localStorage.getItem('token')
    let botNameVal = botName.split(" ").join("-")
    console.log('showing values...')


    if (token) {
      if (botNameVal && selectedTimeFrame && stakeAmount && availableCapital) {
        try {
          await axios({
            method: "post",
            url: "/create-tradebot",
            headers: { "x-access-token": token },
            data: {
              name: botNameVal,
              pair: selectedPair,
              timeframe: selectedTimeFrame,
              stakeAmount: stakeAmount,
              availableCapital: availableCapital,
              buyOrderBookTopBid: Number(selectedBuyOrderBookPrice),
              sellOrderBookTopBid: Number(selectedSellOrderBookPrice),
              roiImmediate: (Number(roiImmediate) / 100),
              roiTenMin: (Number(roiTenMin) / 100),
              roiTwentyMin: (Number(roiTwentyMin) / 100),
              roiThirtyMin: (Number(roiThirtyMin) / 100),
              roiFourtyMin: (Number(roiFourtyMin) / 100),
              roiFiftyMin: (Number(roiFiftyMin) / 100),
              roiSixtyMin: (Number(roiSixtyMin) / 100),
              roiTwoHr: (Number(roiTwoHr) / 100),
              roiThreeHr: (Number(roiThreeHr) / 100),
              roiFourHr: (Number(roiFourHr) / 100),
              roiFiveHr: (Number(roiFiveHr) / 100),
              roiSixHr: (Number(roiSixHr) / 100),
              roiSevenHr: (Number(roiSevenHr) / 100),
              roi24Hr: (Number(roi24Hr) / 100),
              stopLoss: -(Number(stopLoss) / 100)
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
                  <input type="text" value={botName} onChange={e => setBotName(e.target.value)} class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="BTC-BOT" />
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

              <div class="mt-6 mb-8">
                <div class="dropdown inline-block relative">
                  <button class="bg-gray-300 text-gray-700 text-sm py-2 px-6 rounded inline-flex items-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Pair:&nbsp;&nbsp;
                    <select value={selectedPair} onChange={handleSelectPair} class="bg-gray-300 text-gray-700 text-sm mx-2 px-12 rounded inline-flex items-center">
                      <option value="" selected>Select Pair</option>
                      <option value="BTC/USDT">BTC/USDT</option>
                      <option value="DOGE/USDT">DOGE/USDT</option>
                      <option value="ETH/USDT">ETH/USDT</option>
                      <option value="BTC/BUSD">BTC/BUSD</option>
                      <option value="BUSD/USDT">BUSD/USDT</option>
                      <option value="APE/USDT">APE/USDT</option>
                      <option value="BNB/USDT">BNB/USDT</option>
                      <option value="MATIC/USDT">MATIC/USDT</option>
                      <option value="BUSD/USDT">ETH/BTC</option>
                      <option value="XRP/USDT">XRP/USDT</option>
                      <option value="NEAR/USDT">NEAR/USDT</option>
                      <option value="LUNA/BTC">LUNA/BTC</option>
                      <option value="VET/USDT">VET/USDT</option>
                      <option value="MANA/USDT">MANA/USDT</option>
                      <option value="AXS/USDT">AXS/USDT</option>
                      <option value="NEAR/BUSD">NEAR/BUSD</option>
                      <option value="SOL/USDT">SOL/USDT</option>
                      <option value="TUSD/USDT">TUSD/USDT</option>
                      <option value="XMR/USDT">XMR/USDT</option>
                      <option value="SHIB/USDT">SHIB/USDT</option>
                      <option value="JASMY/USDT">JASMY/USDT</option>
                      <option value="LUNA/BUSD">LUNA/BUSD</option>
                      <option value="UST/BUSD">UST/BUSD</option>
                      <option value="UST/USDT">UST/USDT</option>
                      <option value="GLMR/USDT">GLMR/USDT</option>
                      <option value="IOST/USDT">IOST/USDT</option>
                    </select>
                  </button>
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

            <div class="p-16 m-4 max-w-4xl bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-8 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Minimal ROI
              </h5>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell immediately if there is at least {roiImmediate}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiImmediate} onChange={handleRoiImmediate} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 10 minutes if there is at least {roiTenMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiTenMin} onChange={(event) => { setRoiTenMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 20 minutes if there is at least {roiTwentyMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiTwentyMin} onChange={(event) => { setRoiTwentyMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 30 minutes if there is at least {roiThirtyMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiThirtyMin} onChange={(event) => { setRoiThirtyMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 40 minutes if there is at least {roiFourtyMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiFourtyMin} onChange={(event) => { setRoiFourtyMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 50 minutes if there is at least {roiFiftyMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiFiftyMin} onChange={(event) => { setRoiFiftyMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 60 minutes if there is at least {roiSixtyMin}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiSixtyMin} onChange={(event) => { setRoiSixtyMin(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                </div>

                <div>
                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 2 hour if there is at least {roiTwoHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiTwoHr} onChange={(event) => { setRoiTwoHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 3 hours if there is at least {roiThreeHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiThreeHr} onChange={(event) => { setRoiThreeHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 4 hours if there is at least {roiFourHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiFourHr} onChange={(event) => { setRoiFourHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 5 hours if there is at least {roiFiveHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiFiveHr} onChange={(event) => { setRoiFiveHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 6 hours if there is at least {roiSixHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiSixHr} onChange={(event) => { setRoiSixHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 7 hours if there is at least {roiSevenHr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roiSevenHr} onChange={(event) => { setRoiSevenHr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>

                  <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                    <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300"> Sell after 24 hours if there is at least {roi24Hr}% profit</label>
                    <input id="minmax-range" type="range" min="1" max="100" value={roi24Hr} onChange={(event) => { setRoi24Hr(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                  </h5>
                </div>
              </div>
            </div>

            <div class="p-4 m-4 max-w-4xl bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Stop Loss
              </h5>

              <h5 class="mb-5 text-base font-semibold text-gray-500 lg:text-xl dark:text-white">
                <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">Sell immediately if the profit dips below -{stopLoss}%</label>
                <input id="minmax-range" type="range" min="1" max="100" value={stopLoss} onChange={(event) => { setStopLoss(event.target.value) }} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              </h5>

            </div>

            <div class="p-4 m-4 max-w-4xl bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Trade
              </h5>

              <div class="mt-6 ">
                <div class="dropdown inline-block relative">
                  <button class="bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded inline-flex items-center">
                    <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                    Sell: Orderbook Price Level
                    <select value={selectedSellOrderBookPrice} onChange={handleSellOrderBookPrice} class="bg-gray-300 text-gray-700 text-sm mx-2 px-8 rounded inline-flex items-center">
                      <option value="1" selected>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </button>
                </div>
              </div>

              <div class="mt-6">
                <div class="dropdown inline-block relative">
                  <button class="bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded inline-flex items-center">
                    <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                    Buy: Orderbook Price Level
                    <select value={selectedBuyOrderBookPrice} onChange={handleBuyOrderBookPrice} class="bg-gray-300 text-gray-700 text-sm mx-2 px-8 rounded inline-flex items-center">
                      <option value="1" selected>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </button>
                </div>
              </div>

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
