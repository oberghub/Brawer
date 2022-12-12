import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsBookmark } from 'react-icons/bs'

export const Book = () => {
    const BookData = useState([
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg'
        },
    ])
    const navigate = useNavigate()
    const toggleslide = () => {
        document.getElementById('slide-toggle').classList.toggle('invisible')
        document.getElementById('slide-toggle').classList.toggle('translate-x-[-100%]');
    }
    return (
        <>
            <div className="w-full flex relative">
                {/* Filter Bar */}
                <div id="slide-toggle" className="w-full sm:w-[280px] h-screen bg-white fixed left-0 mt-[32px] sm:mt-[64px] z-30 drop-shadow-2xl p-[1.5em] duration-300 ease-out transition-all translate-x-[-100%] invisible">
                    {/* Top of bar */}
                    <div className="relative flex border-b-[1px] border-gray-400">
                        <p className="text-4xl Gentium-B-font mb-3">Filters</p>
                        <div className="absolute right-0 cursor-pointer m-1" onClick={() => {toggleslide()}}>
                            <svg height="20px" viewBox="0 0 512 512" width="20px">
                                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                            </svg>
                        </div>
                    </div>
                 </div>

                {/* Book grid */}
                <div className="ml-auto mr-auto">
                    <div className="w-full h-[100px] lg:h-[200px] flex items-center p-5 min-[945px]:p-10 mt-[3em] slide-in-l">
                        <GiHamburgerMenu size={30} className="cursor-pointer mr-5" onClick={() => {toggleslide()}} />
                        <p className="text-4xl Gentium-B-font">All Books</p>
                    </div>
                    <div className="w-full h-auto flex justify-center">
                        <div className="grid 
                                        grid-cols-1 min-[480px]:grid-cols-2 min-[945px]:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
                                        gap-10
                                        p-5 min-[945px]:p-10
                                        ">
                                {BookData[0].map((book, index) =>                             
                                <div key={index} className="down-scale-2 w-full
                                    h-auto
                                    bg-white
                                    drop-shadow-xl
                                    p-5">
                                    {/* Book Image */}
                                    <img src={require('../../local_image/think_python.png')} className="w-full h-auto cursor-pointer" alt='book'
                                    onClick={() => {navigate("/book-info", {state : {item : book}} )}} />
                                    {/* Book Title */}
                                    <div className="w-full
                                                    h-auto
                                                    mt-2 pl-2">
                                        <p className="leading-tight line-clamp-2 text-xl">{book.title}</p>                    
                                    </div>
                                    <div className="w-full
                                                    h-auto
                                                    mt-5 pl-2 relative">
                                        <BsBookmark size={25} className="cursor-pointer" onClick={() => {console.log("added to bookmark")}} />                
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
// {BookData[0].map((book, index) =>                             
//     <div key={index} className="w-full min-[945px]:w-[280px]
//         h-auto min-[945px]:h-[510px]
//         border-[1px]
//         border-black drop-shadow-lg
//         p-5">
//         {/* Book Image */}
//         <img src={require('../local_image/book_ex.jpg')} className="w-full min-[945px]:w-[300px] h-auto min-[945px]:h-[360px] cursor-pointer" alt='book'
//         onClick={() => {navigate("/book-info", {state : {item : book}} )}} />
//         {/* Book Title */}
//         <div className="w-full min-[945px]:w-[255px]
//                         h-auto min-[945px]:h-[60px]
//                         mt-2 pl-2">
//             <p className="leading-tight line-clamp-2">{book.title}</p>                    
//         </div>
//         <div className="w-full min-[945px]:w-[255px]
//                         h-auto min-[945px]:h-[40px]
//                         mt-5 pl-2 relative">
//             <BsBookmark size={25} className="static min-[945px]:absolute left-1 cursor-pointer" onClick={() => {console.log("added to bookmark")}} />                
//         </div>
//     </div>)}