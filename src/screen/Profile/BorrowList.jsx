import React, { useState } from "react";

export const BorrowList = () => {
    const [borrowList, setBorrowList] = useState([
        {
            b_date: '15 December 2022',
            d_date: '16 December 2022',
            late: true,
            books : [
                {
                    title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
                    desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
                    img: '../../local_image/book_ex.jpg',
                    quantity: 2,
                },
                {
                    title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
                    desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
                    img: '../../local_image/book_ex.jpg',
                    quantity: 1,
                },
            ]
        },
        {
            b_date: '15 December 2022',
            d_date: '19 December 2022',
            late: false,
            books : [
                {
                    title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
                    desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
                    img: '../../local_image/book_ex.jpg',
                    quantity: 2,
                },
            ]
        }
    ])
    return (
        <div className="w-full">
            {borrowList.map((item, index) =>
                <>
                    {/* Book card */}
                    <div className="w-full bg-white drop-shadow-xl rounded p-5 relative mb-10" key={index}>
                        {/* Card Header */}
                        <div className="w-full text-2xl">
                            {/* Borrow Date */}
                            <div className="w-full flex relative">
                                <div className="flex slide-in-l">
                                    <div className="w-[150px] Gentium-B-font">
                                        <p>Borrow Date</p>
                                    </div>
                                    <div className="">
                                        <p>{item.b_date}</p>
                                    </div>
                                </div>
                                <div className="hidden lg:block lg:absolute right-0 slide-in-r">
                                    <p>Total : {item.books.map(item => item.quantity).reduce((a, b) => a+b)} ea</p>
                                </div>
                            </div>
                            <div className="w-full lg:flex relative mb-10">
                                <div className="flex slide-in-l">
                                    <div className="w-[150px] Gentium-B-font">
                                        <p>Due Date</p>
                                    </div>
                                    <div className="">
                                        <p>{item.d_date}</p>
                                    </div>
                                </div>
                                <div className="lg:hidden slide-in-r">
                                    <p>Total : {item.books.map(item => item.quantity).reduce((a, b) => a+b)} ea</p>
                                </div>
                            {item.late ?
                            <>
                            <div className="lg:absolute right-0 slide-in-r">
                                <p>You are lated! <u className="text-red-500 cursor-pointer ml-3">Pay a fine</u></p>
                            </div>
                            </>
                            :
                            null
                            }
                            </div>
                        </div>
                        {item.books.map((books, index) =>
                            <>
                            <div className="w-full sm:h-auto bg-white drop-shadow min-[450px]:flex mt-3 p-0 slide-in-r">
                                <div className="w-auto">
                                    <img src={require('../../local_image/think_python.png')} className="min-[450px]:w-[180px] min-[450px]:h-[220px] cursor-pointer" alt='book' />
                                </div>
                                <div className="min-[450px]:w-full p-5">
                                    <p className="text-xl min-[450px]:text-2xl line-clamp-2">{books.title}</p>
                                    <b className="text-lg min-[450px]:text-xl">x{books.quantity}</b>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}