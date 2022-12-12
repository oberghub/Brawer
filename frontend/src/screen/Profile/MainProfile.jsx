import React, { useState, useEffect } from "react";
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDown } from 'react-icons/ai'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
export const MainProfile = () => {
    const navigate = useNavigate()
    const selected = useLocation()
    const [menu, setMenu] = useState([
        {title : "Edit Profile", link : "edit-profile"},
        {title : "Favourite", link : "favourite"},
        {title : "Borrow List", link : "borrow-list"},
        {title : "Booking History", link : "booking-history"}
    ])
    useEffect(() => {
        if(selected.pathname == "/profile"){
          navigate("/profile/edit-profile")
        }
      }, [])
    return(
        <>
        <div className="xl:w-[90%] h-screen m-auto p-[2em]">
            {/* Profile Header */}
            <div className="w-full sm:h-[100px] border-b-[1px] mt-[3em] border-gray sm:flex items-center relative">
                <p className="slide-in-l text-4xl Gentium-B-font">My Profile</p>
                <div className="slide-in-r w-[150px] h-[45px] my-5 sm:my-0 sm:ml-5 bg-white drop-shadow-xl rounded-lg flex items-center justify-center sm:absolute right-0 cursor-pointer">
                    <p className="text-xl Gentium-B-font">Sign Out</p>
                </div>
            </div>
            {/* Profile Display */}
            <div className="w-full sm:h-[150px] sm:flex items-center mt-3 sm:p-5">
                {/* ProfilePic */}
                <img src={require('../../local_image/sek.jpg')} className="w-[100px] h-[100px] bg-gray-200 rounded-full" alt="profile-pic" />
                {/* User data */}
                <div className="my-5 sm:my-0 sm:ml-5 slide-in-l">
                    <div className="flex">
                        <p className="text-2xl sm:text-3xl">Display Name : Bookalicious</p>
                        <CiEdit size={20} className="ml-3 mt-1"/>
                    </div>
                    <p>Email : paperbackbook_1@zmail.com</p>
                    <p>Phone Number : 052-312-4571</p>
                </div>
            </div>
            {/* Menu Navigate */}
            <div className="w-full h-auto md:flex md:mt-5 md:p-5">
                <div className="w-[200px]">
                    <div className="flex cursor-pointer">
                        <p className="text-3xl Gentium-B-font mb-3 slide-in-l">Menu</p>
                        {/* <AiOutlineDown className="ml-3 mt-1" size={30}/> */}
                    </div>
                    <div id="mainprofile-menu-toggle" className="p-2 text-[22px]">
                        {menu.map((item, index) => <>
                            <div>
                                {selected.pathname.substring(9) == item.link ?
                                 <p className="slide-in-l mb-3 text-gray-300"><Link className="cursor-default" to={item.link}>{item.title}</Link></p>
                                 :
                                 <p className="slide-in-l mb-3 cursor-pointer"><Link to={item.link}>{item.title}</Link></p>
                                }
                            </div>
                        </>)}
                    </div>
                </div>

                {/* Show a content after press a some menu list */}
                <div className="w-full h-auto md:ml-6">
                    <Outlet />
                </div>
            </div>
        </div>
        </>
    )
}