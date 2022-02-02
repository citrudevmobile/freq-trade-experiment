import { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios'

import emailImage from '../images/trader.jpg';
import trading from '../images/trade.jpg';


export default function emailConfirmation({}) {

    const { token } = useParams()

    let confirmEmail = async function () {
        try {
            let response = await axios({
                method: 'post',
                url: '/confirm-email-link',
                headers: { "x-access-token": token },
            })
            console.log(response)
            console.log('activated')
        } catch (error) {
            console.log(error)
            console.log('fail')
        }
    }
  
    useEffect(()=>{
       confirmEmail()
    }, [])

    return (
    <>
    <section class="flex justify-center items-center text-white bg-black bg-no-repeat bg-center bg-cover min-h-screen w-full" style={{ backgroundImage: 'url(' + trading + ')'}} >
        <div class="absolute bg-black p-0 m-0 opacity-90 inset-0 z-0 h-screen w-full"></div>
        <header class="text-white opacity-90 bg-white rounded-md p-5 mx-auto w-3/4 sm:w-3/6 h-full">
            <div class="container mx-auto md:p-10 flex flex-col space-y-5">
                <h1 class="text-black text-xl md:text-4xl text-center font-bold text-center">Best Crypto Bot Ever!</h1>
                
                    <a class="block" href="#">
                        <img
                        class="shadow-sm mx-auto object-scale-down"
                        height="100"
                        src={emailImage}
                        alt="logo"
                        rel="preload"
                        />
                    </a>
                    <p class="text-gray-500 text-xs text-center md:text-base">Great! Your email has been confirmed.</p>
                
                <div class="flex items-center justify-center space-x-1">
                    <NavLink end to="/dashboard"  className="bg-blue-300 text-xs md:text-base rounded-md p-2 hover:text-white hover:bg-blue-500" href="#">Dashboard</NavLink >
                </div>
            </div>
            </header>
    </section>
    </>
    )
  }
