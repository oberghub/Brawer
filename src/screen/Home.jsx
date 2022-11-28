import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <>
        <div className="w-full m-auto flex justify-center">
            <div className="w-full">
                <div className="w-full 
                                h-screen sm:h-[448.5px] 
                                bg-[#2F5D62] relative">
                                    {/* top-1/3 sm:top-1/4 left-8 sm:right-8 lg:right-20 */}
                    <div className="absolute 
                                    top-1/3 sm:top-1/4 md:right-14 lg:right-20
                                    lg:top-1/3
                                    px-4 sm:px-10 md:px-0">
                        {/* text */}
                        <p className="text-6xl sm:text-7xl lg:text-8xl text-white Gentium-B-font">To Be A BookWorm!</p>
                        {/* button */}
                        <Link to={"all-books"} className="w-60 h-14 bg-[#A7C4BC] flex justify-center items-center mt-4 ml-4 cursor-pointer
                                        hover:bg-[#98b3ab]" 
                                        onClick={() => {console.log("Hi")}}>
                            <p className="Gentium-B-font text-white text-xl">Get Started</p>
                        </Link>
                    </div>
                    {/* <img src={require('../local_image/book_bg.jpg')} className="bg-cover opacity-50" alt='book_bg' /> */}
                </div>
                <div className="w-full 
                                h-screen sm:h-[448.5px]
                                bg-[#A7C4BC] relative">
                    {/* <img src={require('../local_image/workspace_bg.jpg')} className="bg-cover opacity-50"  alt='workspace_bg' /> */}
                    {/* top-1/3 sm:top-1/4 md:left-8 lg:left-20 */}
                    <div className="absolute
                                    left-0 md:left-20
                                    top-1/4
                                    px-10 md:px-0">
                        {/* text */}
                        <p className="text-6xl sm:text-7xl lg:text-8xl text-white Gentium-B-font">Get Some</p>
                        <p className="text-6xl sm:text-7xl lg:text-8xl text-white Gentium-B-font">Co-Working Space</p>
                        {/* button */}
                        <div className="w-60 h-14 bg-[#2F5D62] flex justify-center items-center mt-4 ml-4 cursor-pointer
                                        hover:bg-[#264d52]">
                            <p className="Gentium-B-font text-white text-xl">Let's Go!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}