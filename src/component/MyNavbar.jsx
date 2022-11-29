import React from "react";
import { Link } from "react-router-dom";
import { TextField } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
export const MyNavbar = () => {
    return (
        <>
            {/* Navbar */}
            <div className='sticky top-0 z-50'>
                <div className='w-full h-10 sm:h-16 px-5 lg:px-10 drop-shadow flex justify-center
                                bg-white'>
                    <div className='w-[1920px]
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
                            <p className='text-2xl cursor-pointer'>WorkSpace</p>
                        </div>
                        {/* Image Profile */}
                        <div className='absolute right-0 cursor-pointer hidden lg:flex'>
                            <img src={require('../local_image/sek.jpg')} className="w-10 h-10 rounded-full" alt='profile-pic' />
                        </div>
                        {/* content > 1024px */}

                        {/* content < 1024px */}
                        <div className='absolute right-0 cursor-pointer lg:hidden'>
                            <GiHamburgerMenu size={30} />
                        </div>
                        {/* content < 1024px */}

                    </div>
                </div>
            </div>
        </>
    )
}