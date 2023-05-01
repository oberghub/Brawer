import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { setLoaded, userdata } from "../userSlice";
import axios from "axios";
import userService from "../userService";
export const MyNavbar = () => {
    const [acc, setAcc] = useState(false)
    const [bookInCart, setBookInCart] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user_data.user)

    //--- Google OAuth ---//
    const CLIENT_ID = "657796919531-5h1omqe0i3dt1t6pkue7lin4rj7nd4tb.apps.googleusercontent.com"
    const onSuccess = async (res) => {
        const { name, email, imageUrl } = response.profileObj;

        const existingUser = await userService.getUserData(email);
        if (existingUser) {
            // Set the user data in the state using the existing data from DynamoDB
            setAcc(existingUser);
        } else {
            // Save the new user data to DynamoDB
            const newUser = {
            name: name,
            email: email,
            imageUrl: imageUrl,
            role: "user", // default role
            favouriteBooks: [], // default empty array
            };
            userService.saveUserData(newUser);
            setAcc(newUser);
  }

        // OLD CODE
        // const profile = res.profileObj;
        // setAcc(profile)
        // // console.log("success:", profile);
        // let userData = { name: profile.name, email: profile.email }
        // // console.log(userData)
        // axios.post("http://localhost:8082/user-service/user/isexist", userData, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }).then((res) => {
        //     console.log(res.status + " " + res.statusText)
        //     if (res.status == 200) {
        //         dispatch(userdata({ ...res.data, imageUrl: profile.imageUrl }))
        //     } else {
        //         dispatch(userdata({
        //             name: profile.name,
        //             email: profile.email,
        //             imageUrl: profile.imageUrl
        //         }))
        //     }
        // })



    };
    const onFailure = (err) => {
        console.log("failed:", err);
    };
    const logout = () => {
        window.location.reload(false);
        setAcc(false)
        toggleslide()
        localStorage.clear()
        //ทำเสร็จแล้ว reload page
    };
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: "https://www.googleapis.com/auth/userinfo.profile"
            });
        };
        gapi.load('client:auth2', initClient);
        dispatch(setLoaded(true))
    });
    //--- Google OAuth ---//
    // useEffect(() => {
    //     //
    // }, [user])

    const toggleslide = () => {
        document.getElementById('slide-profile').classList.toggle('invisible')
        document.getElementById('slide-profile').classList.toggle('translate-y-[-100%]');
    }
    useEffect(() => { //ติดWarning Maximum update depth exceeded. ใครก็ได้ฝากที TT
        let arr = JSON.parse(secureLocalStorage.getItem('books'))
        setBookInCart(() => !arr ? [] : arr)
    }, [])
    return (
        <>
            {/* Navbar */}

            {/* Menu Slider */}
            <div id="slide-profile" className="w-full sm:w-[250px] h-auto bg-white fixed right-0 drop-shadow-lg mt-[32px] sm:mt-[64px] p-[2em] sm:p-[1em]
                                                  transition-all duration-300 ease-out translate-y-[-100%] invisible z-40">
                {/* Top of menu */}
                <div className="relative w-full h-[40px] border-b-[0.5px] border-gray-200 flex">
                    <p className="text-2xl Gentium-B-font" onClick={() => { console.log(user) }}>Menu</p>
                    <div className="absolute right-0 cursor-pointer m-1" onClick={() => { toggleslide() }}>
                        <svg height="20px" viewBox="0 0 512 512" width="20px">
                            <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                        </svg>
                    </div>
                </div>
                {/* ถ้ายังไม่ login */}
                {!acc ?
                    <>
                        {/* Body of menu */}
                        <div className="mt-[1em] h-[100px] sm:h-[175px] flex justify-center items-center">
                            <p>You haven't logged in yet.</p>
                        </div>
                        <p className="text-2xl Gentium-B-font mt-[0.7em]">Navigate</p>
                        <div className="mt-[0.5em] border-t-[0.5px] border-gray-400 mb-[1em]">
                            <Link to={'all-books'} onClick={toggleslide}>
                                <p className="text-xl cursor-pointer Gentium-B-font mt-[0.8em]">Books</p>
                            </Link>
                            <Link to={'all-spaces'} onClick={toggleslide}>
                                <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">WorkSpaces</p>
                            </Link>
                            {user.role !== 'admin' ? null :
                                <Link to={'management'} onClick={toggleslide}>
                                    <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">Management</p>
                                </Link>
                            }

                        </div>
                        {/* Bottom of menu */}
                        {/* Sign in with google */}
                        <div className="w-full border-t-[0.5px] border-gray-400 mt-[1em] sm:mt-0 flex">
                            {/* <button onClick={() => {}} type="button" class="mt-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mt-3">
                                <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                Sign in with Google
                            </button> */}
                            <GoogleLogin
                                className="mt-3"
                                clientId={CLIENT_ID}
                                buttonText="Sign in with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                    </>
                    :
                    <>
                        {/* Body of menu */}
                        <div className="mt-[1em]">
                            <p className="text-lg cursor-pointer" onClick={() => {
                                navigate("/profile/favourite")
                                toggleslide()
                            }}>Profile</p>
                            <p className="text-lg cursor-pointer mt-[0.3em]" onClick={() => {
                                navigate("/profile/booking-history")
                                toggleslide()
                            }}>Booking History</p>
                            <p className="text-lg cursor-pointer mt-[0.3em]" onClick={() => {
                                navigate("/profile/favourite")
                                toggleslide()
                            }}>Your Favourite</p>
                            {bookInCart.length !== 0 ?
                                <p className="text-lg cursor-pointer mt-[0.3em]" onClick={() => {
                                    navigate("/borrow-cart")
                                    toggleslide()
                                }}>Your Book Cart ({bookInCart.length})</p>
                                : null}
                        </div>
                        <p className="text-2xl Gentium-B-font mt-[0.7em]">Navigate</p>
                        <div className="mt-[0.5em] border-t-[0.5px] border-gray-200 mb-[1em]">
                            <Link to={'all-books'} onClick={toggleslide}>
                                <p className="text-xl cursor-pointer Gentium-B-font mt-[0.8em]">Books</p>
                            </Link>
                            <Link to={'all-spaces'} onClick={toggleslide}>
                                <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">WorkSpaces</p>
                            </Link>
                            {user.role !== 'admin' ? null :
                                <Link to={'management'} onClick={toggleslide}>
                                    <p className="text-xl cursor-pointer Gentium-B-font mt-[0.5em]">Management</p>
                                </Link>
                            }

                        </div>
                        {/* Bottom of menu */}
                        <div className="w-full border-t-[0.5px] border-gray-200 mt-[1em] sm:mt-0 flex">
                            <div className="relative block lg:hidden">
                                <img onClick={() => {
                                    navigate("/profile/favourite")
                                    toggleslide()
                                }} src={acc.imageUrl.toString()} className="w-10 h-10 rounded-full mt-4 mr-3 cursor-pointer" alt='profile-pic' />
                                {bookInCart.length !== 0 ?
                                    <div className="w-5 h-5 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-[-5px]">
                                        <p className="text-lg text-white Gentium-B-font">{bookInCart.length}</p>
                                    </div>
                                    : null}
                            </div>
                            <GoogleLogout
                                className="mt-3"
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Sign Out"
                                onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
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
                        <div onClick={() => { console.log(acc) }} className=' mr-8 lg:mr-10'>
                            <Link to={"/"} className='Gentium-B-font text-3xl cursor-pointer'>BRAWER</Link>
                        </div>
                        {/* Nav Search Bar */}
                        {/* <div className='hidden sm:flex items-center lg:mr-14'>
                            <TextField id="outlined-basic" variant="outlined" size='small' />
                            <AiOutlineSearch size={20} className='ml-4 cursor-pointer' />
                        </div> */}

                        {/* content > 1024px */}
                        {/* Choice to loan item */}
                        <div className='hidden lg:flex ml-[3em]'>
                            <Link to={"all-books"} className='text-2xl mr-10 cursor-pointer'>Books</Link>
                            <Link to={'all-spaces'} className='text-2xl mr-10 cursor-pointer'>WorkSpaces</Link>
                            {user.role !== 'admin' ? null :
                                <Link to={'management'} onClick={() => {}}>
                                    <p className="text-2xl cursor-pointer">Management</p>
                                </Link>
                            }
                        </div>
                        {/* Image Profile */}
                        <div className='absolute right-0 cursor-pointer hidden lg:flex'>
                            {!acc ?
                                // <button onClick={() => { }} type="button" class="mt-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                //     <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                //     Sign in with Google
                                // </button>
                                <GoogleLogin
                                    clientId={CLIENT_ID}
                                    buttonText="Sign in with Google"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                />
                                :
                                <div className="flex gap-5">
                                    <p className="mt-2 text-lg Gentium-B-font" onClick={() => { navigate('/profile') }}>{acc.name}</p>
                                    <img onClick={() => { toggleslide() }} src={acc.imageUrl.toString()} className="w-10 h-10 rounded-full" alt='profile-pic' />
                                </div>
                            }
                            {/* ถ้ามีการ Add Item เข้า Cart จะขึ้นตุ่มแดงๆมีเลข */}
                            {bookInCart.length !== 0 ?
                                <div className="w-5 h-5 rounded-full bg-red-500 flex justify-center items-center absolute right-[-10px] bottom-[-5px]">
                                    <p className="text-lg text-white Gentium-B-font">{bookInCart.length}</p>
                                </div>
                                : null}
                        </div>
                        {/* content > 1024px */}

                        {/* content < 1024px */}
                        <div className='absolute right-0 cursor-pointer lg:hidden'>
                            <GiHamburgerMenu size={30} onClick={() => { toggleslide() }} />
                        </div>
                        {/* content < 1024px */}
                    </div>
                </div>
            </div>
        </>
    )
}