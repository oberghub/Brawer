import React, {useState} from "react";
import { BsBookmark } from 'react-icons/bs'
export const BookInfo = () => {
    const BookData = useState(
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',})
    return (
        <>
            <div className="w-full h-auto xl:h-[890px] flex justify-center item-center xl:items-end">

                {/* Content container */}
                <div className="w-full xl:w-[1280px] 
                                h-auto xl:h-[755px] 
                                block sm:flex
                                justify-center
                                p-0 sm:p-[1.5em] xl:p-[3em] 
                                xl:border-t-[1px] xl:border-l-[1px] xl:border-r-[1px] border-black">
                    {/* Book Container */}
                    <div className="hidden sm:flex w-auto xl:w-[40%] relative">
                        <div className="w-[300px] xl:w-[400px] 
                                        h-[460px] xl:h-[560px] relative">
                            {/* Book Image */}
                            <div className="w-[365px] 
                                            h-[535px] 
                                            border-[1px] border-black absolute right-0 hidden xl:flex"></div>
                            <img src={require('../local_image/book_ex.jpg')} className="w-[295px] xl:w-[365px] 
                                                                                        h-[435px] xl:h-[535px]  
                                                                                        absolute bottom-0" alt='book' />
                        </div>
                    </div>
                    {/* Book Container < sm */}
                    <div className="w-full flex justify-center mt-[2em] sm:hidden">
                        <img src={require('../local_image/book_ex.jpg')} className="w-[80%] h-auto" alt='book' />
                    </div>
                    {/* Text Container */}
                    <div className="w-[80%] sm:w-[60%] 
                                    h-[560px] pt-[2em]
                                    ml-[3em] xl:ml-0">
                        {/* Text Title */}
                        <div className="w-full h-[100px]">
                            <p className="text-4xl line-clamp-2">{BookData[0].title}</p>
                        </div>
                        {/* Add to list button */}
                        <div className="w-full h-auto flex">
                            {/* Button */}
                            <div className="w-[80%] h-[50px] flex justify-center items-center bg-black cursor-pointer">
                                <p className="text-white text-lg">Add to Cart</p>
                            </div>
                            {/* Bookmark icon */}
                            <div className="md:w-[20%] md:h-[50px] flex items-center">
                                <BsBookmark size={25} className="cursor-pointer ml-[1em] sm:ml-[2em]" onClick={() => {console.log("added to bookmark")}} />
                            </div>
                        </div>
                        {/* Description */}
                        <div className="w-full mt-[2em]">
                            <p className="text-4xl mb-[0.5em] Gentium-B-font">Description</p>
                            <div className="w-full h-auto">
                                <p className="text-xl line-clamp-6 xl:line-clamp-none">{BookData[0].desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}