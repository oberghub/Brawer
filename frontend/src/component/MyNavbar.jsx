import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const MyNavbar = () => {
    const [acc, setAcc] = useState(true)
    const [bookInCart, setBookInCart] = useState([])
    const navigate = useNavigate()
    const toggleslide = () => {
        document.getElementById('slide-profile').classList.toggle('invisible')
        document.getElementById('slide-profile').classList.toggle('translate-y-[-100%]');
    }
    // useEffect(() => { //ติดWarning Maximum update depth exceeded. ใครก็ได้ฝากที TT
    //     let arr = JSON.parse(localStorage.getItem('books'))
    //     setBookInCart(() => !arr ? [] : arr)
    // }, [JSON.parse(localStorage.getItem('books'))])
    return (
        <>
            {/* Navbar */}

            {/* Menu Slider */}
            <div id="slide-profile" className="w-full sm:w-[250px] h-auto lg:h-[300px] bg-white fixed right-0 drop-shadow-lg mt-[32px] sm:mt-[64px] p-[2em] sm:p-[1em]
                                                  transition-all duration-300 ease-out translate-y-[-100%] invisible z-40">
                {/* Top of menu */}
                <div className="relative w-full h-[40px] border-b-[0.5px] border-gray-200 flex">
                    <p className="text-2xl Gentium-B-font">Menu</p>
                    <div className="absolute right-0 cursor-pointer m-1" onClick={() => {toggleslide()}}>
                        <svg height="20px" viewBox="0 0 512 512" width="20px">
                            <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                        </svg>
                    </div>
                </div>
                {!acc ?
                    <>
                {/* Body of menu */}
                <div className="mt-[1em] h-[100px] sm:h-[175px] flex justify-center items-center">
                    <p>You haven't logged in yet.</p>
                </div>
                {/* small screen */}
                <p className="block sm:hidden text-2xl Gentium-B-font mt-[0.7em]">Navigate</p>
                <div className="block sm:hidden mt-[0.5em] border-t-[0.5px] border-gray-400">
                    <Link to={'all-books'} onClick={toggleslide}>
                        <p className="text-xl cursor-pointer Gentium-B-font mt-[0.8em]">Book</p>
                    </Link>
                    <Link to={'all-spaces'} onClick={toggleslide}>
                        <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">WorkSpace</p>
                    </Link>
                </div>
                {/* Bottom of menu */}
                <div className="w-full border-t-[0.5px] border-gray-400 mt-[1em] sm:mt-0 flex">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mt-4 mr-3 block sm:hidden"></div>
                    <p className="text-lg mt-6 sm:mt-3 cursor-pointer">Sign In</p>
                </div>
                    </>
                :
                    <>
                {/* Body of menu */}
                <div className="mt-[1em] lg:h-[175px]">
                    <p className="text-lg cursor-pointer" onClick={() => {navigate("/profile/edit-profile") 
                                                                          toggleslide()}}>Profile</p>
                    <p className="text-lg cursor-pointer mt-[0.3em]" onClick={() => {navigate("/profile/booking-history")
                                                                                     toggleslide()}}>Booking History</p>
                    <p className="text-lg cursor-pointer mt-[0.3em]"onClick={() => {navigate("/profile/favourite")
                                                                                     toggleslide()}}>Your Favourite</p>
                    <p className="text-lg cursor-pointer mt-[0.3em]" onClick={() => {navigate("/borrow-cart" ) 
                                                                                     toggleslide()}}>Your Book Cart ({bookInCart.length})</p>
                </div>
                {/* < lg */}
                <p className="block lg:hidden text-2xl Gentium-B-font mt-[0.7em]">Navigate</p>
                <div className="block lg:hidden mt-[0.5em] border-t-[0.5px] border-gray-400 mb-[1em]">
                    <Link to={'all-books'} onClick={toggleslide}>
                        <p className="text-xl cursor-pointer Gentium-B-font mt-[0.8em]">Book</p>
                    </Link>
                    <Link to={'all-spaces'} onClick={toggleslide}>
                        <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">WorkSpace</p>
                    </Link>
                </div>
                {/* Bottom of menu */}
                <div className="w-full border-t-[0.5px] border-gray-200 mt-[1em] sm:mt-0 flex">
                    <div className="relative block sm:hidden">
                        <img src={require('../local_image/sek.jpg')} className="w-10 h-10 rounded-full mt-4 mr-3" alt='profile-pic' />
                        <div className="w-5 h-5 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-[-5px]">
                            <p className="text-lg text-white Gentium-B-font">1</p>
                        </div>
                    </div>
                    <p className="text-lg mt-6 sm:mt-3 cursor-pointer">Sign Out</p>
                </div>
                    </>
                }

            </div>
            {/* Navbar */}
            <div className='w-full fixed top-0 z-50'>
                <div className='w-full h-10 sm:h-16 px-5 lg:px-10 drop-shadow flex justify-center
                                bg-white relative'>
                    <div className='w-full
                                h-10 sm:h-16
                                flex items-center bg-red relative'>
                        {/* Nav title */}
                        <div className=' mr-8 lg:mr-10'>
                            <Link to={"/"} className='Gentium-B-font text-3xl cursor-pointer'>BRAWER</Link>
                        </div>
                        {/* Nav Search Bar */}
                        <div className='hidden sm:flex items-center lg:mr-14'>
                            <TextField id="outlined-basic" variant="outlined" size='small' />
                            <AiOutlineSearch size={20} className='ml-4 cursor-pointer' />
                        </div>

                        {/* content > 1024px */}
                        {/* Choice to loan item */}
                        <div className='hidden lg:flex'>
                            <Link to={"all-books"} className='text-2xl mr-10 cursor-pointer'>Book</Link>
                            <Link to={'all-spaces'} className='text-2xl cursor-pointer'>WorkSpace</Link>
                        </div>
                        {/* Image Profile */}
                        <div className='absolute right-0 cursor-pointer hidden sm:flex' onClick={() => {toggleslide()}}>
                            {!acc ?
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            :
                            <>
                            <img src={require('../local_image/sek.jpg')} className="w-10 h-10 rounded-full" alt='profile-pic' />
                            {/* ถ้ามีการ Add Item เข้า Cart จะขึ้นตุ่มแดงๆมีเลข */}
                            <div className="w-5 h-5 rounded-full bg-red-500 flex justify-center items-center absolute right-[-10px] bottom-[-5px]">
                                <p className="text-lg text-white Gentium-B-font">1</p>
                            </div>
                            </>
                            }
                        </div>
                        {/* content > 1024px */}

                        {/* content < 1024px */}
                        <div className='absolute right-0 cursor-pointer sm:hidden'>
                            <GiHamburgerMenu size={30} onClick={() => {toggleslide()}} />
                        </div>
                        {/* content < 1024px */}
                    </div>
                </div>
            </div>
        </>
    )
}