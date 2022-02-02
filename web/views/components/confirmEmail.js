import { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios'
import emailImage from '../images/trader.jpg';
import trading from '../images/trade.jpg';


export default function emailConfirmation({}) {

    const { token } = useParams()
    let [msg, setMsg] = useState('Checking...')
    let [valid, setValid] = useState(false)

    let confirmEmail = async function () {
        try {
            let response = await axios({
                method: 'post',
                url: '/confirm-email-link',
                headers: { "x-access-token": token },
            })
            console.log(response)
            console.log('activated')
            setMsg('Great! Your email has been confirmed.')
            setValid(true)
        } catch (error) {
            console.log(error)
            console.log('fail')
            setMsg('Sorry! Failed to validate your email address. Please try again.')
            setValid(false)
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
                
                    
                        <img
                        class="block shadow-sm mx-auto object-contain "
                        style={{height: '300px'}}
                        src={emailImage}
                        alt="logo"
                        rel="preload"
                        />
                    
                    <p class="text-gray-500 text-xs text-center md:text-base">{msg}</p>
                
                <div class="flex items-center justify-center space-x-1">
                    <a class="bg-blue-300 text-xs md:text-base rounded-md p-2 hover:text-white hover:bg-blue-500" href="#">Resend Email</a>
                    <NavLink end to="/dashboard" className="bg-blue-300 text-xs md:text-base rounded-md p-2 hover:text-white hover:bg-blue-500" href="#">Dashboard</NavLink>
                </div>
            </div>
            </header>
    </section>
    </>
    )
  }
