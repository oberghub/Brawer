import React, { useState, useEffect } from "react";
import { CiEdit } from 'react-icons/ci'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import axios from "axios";
import { userdata } from "../../userSlice";
export const MainProfile = () => {
    const navigate = useNavigate()
    const selected = useLocation()
    const user = useSelector((state) => state.user_data.user)
    const [menu, setMenu] = useState([
        // {title : "Edit Profile", link : "edit-profile"},
        {title : "Favourite", link : "favourite"},
        {title : "Borrow List", link : "borrow-list"},
        {title : "Booking History", link : "booking-history"}
    ])
    const [editstate, setEditState] = useState(false)
    const [e_name, setE_Name] = useState("None")
    const handle_eName = (event) =>{
        setE_Name(event.target.value)
    }
    const dispatch = useDispatch()
    const changeName = () =>{
        
        let updateUser = {
            _id:user._id,
            role:user.role,
            name:e_name,
            email:user.email,
            favouriteBooks:user.favouriteBooks
        }
        console.log(user, updateUser)
        axios.put("http://localhost:8082/user-service/user", JSON.stringify(updateUser), {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((res) => {console.log(res.status + " " + res.statusText)})
        dispatch(userdata({...user,name:e_name}))
        setEditState(false)
    }
    useEffect(() => {
        if(selected.pathname == "/profile"){
          navigate("/profile/favourite")
        }
      }, [])
    return(
        <>
        <div className="xl:w-[90%] h-screen m-auto p-[2em]">
            {/* Profile Header */}
            <div className="w-full sm:h-[100px] border-b-[1px] mt-[3em] border-gray sm:flex items-center relative">
                <p className="slide-in-l text-4xl Gentium-B-font">My Profile</p>
                {/* <div className="slide-in-r w-[150px] h-[45px] my-5 sm:my-0 sm:ml-5 bg-white drop-shadow-xl rounded-lg flex items-center justify-center sm:absolute right-0 cursor-pointer">
                    <p className="text-xl Gentium-B-font">Sign Out</p>
                </div> */}
            </div>
            {/* Profile Display */}
            <div className="w-full sm:h-[150px] sm:flex items-center mt-3 sm:p-5">
                {/* ProfilePic */}
                <div className="relative">
                    {/* <div className="absolute w-[100px] h-[100px] bg-black rounded-full opacity-50 flex justify-center items-center">
                        <p className="text-white opacity-100">Change?</p>
                    </div> */}
                    <img src={user.imageUrl === null ? "" : user.imageUrl} className="w-[100px] h-[100px] bg-gray-200 rounded-full cursor-pointer" alt="profile-pic" />
                </div>
                {/* User data */}
                <div className="my-5 sm:my-0 sm:ml-5 slide-in-l">
                    <div className="flex w-full">
                        {editstate == false ?<>
                            <p className="text-2xl sm:text-3xl">Display Name : {user.name}</p>
                            <CiEdit size={20} className="ml-3 mt-1 cursor-pointer" onClick={() => {setE_Name(user.name);setEditState(true)}}/>
                        </> :<>
                            <p className="text-2xl sm:text-3xl mr-3">Display Name : <TextField  label="" id="title" value={e_name} onChange={handle_eName}/></p>
                            <div onClick={() => {changeName()}} className='mr-3 mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
                                <p className='text-white text-xl'>Change</p>
                            </div>
                            <div onClick={() => { setEditState(false)}} className='mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#bf1321] hover:bg-[#a8111d] flex justify-center items-center'>
                            <p className='text-white text-xl'>Cancel</p>
                            </div>
                        </>}
                        
                        
                        
                    </div>
                    <p>Email : {user.email}</p>
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