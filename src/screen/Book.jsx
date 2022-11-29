import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsBookmark } from 'react-icons/bs'

export const Book = () => {
    const BookData = useState([
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
    ])
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full relative">
                <div className="w-full h-48 px-5 sm:px-[60px] flex items-center">
                    <div className="flex">
                        <GiHamburgerMenu size={30} className="cursor-pointer" onClick={() => {test()}} />
                        <p className="Gentium-B-font text-4xl ml-7">Books</p>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center pb-20">
                    <div className="grid 
                                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
                                    gap-10 
                                    ">
                        {BookData[0].map((book, index) =>                             
                            <div key={index} className="w-[300px]
                                h-[530px]
                                border-[1px]
                                border-black drop-shadow-lg
                                p-5">
                                {/* Book Image */}
                                <img src={require('../local_image/book_ex.jpg')} className="w-[300px] h-[360px] cursor-pointer" alt='book'
                                onClick={() => {navigate("/book-info", {state : {item : book}} )}} />
                                {/* Book Title */}
                                <div className="w-[255px]
                                                h-[60px]
                                                mt-2 pl-2">
                                    <p className="leading-tight">{book.title}</p>                    
                                </div>
                                <div className="w-[255px]
                                                h-[40px]
                                                mt-5 pl-2 relative">
                                    <BsBookmark size={25} className="absolute left-1 cursor-pointer" onClick={() => {console.log("added to bookmark")}} />                
                                </div>
                            </div>)}
                    </div>
                </div>

                {/* <div className="w-[300px] h-screen bg-white drop-shadow fixed top-[6.8%]">
                    <div className="w-[200px] h-[40px] bg-red-100">
                        <p className="text-black text-xl">asdsadsa</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}