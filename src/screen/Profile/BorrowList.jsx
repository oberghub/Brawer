import React, { useState } from "react";

export const BorrowList = () => {
    const [borrowList, setBorrowList] = useState([
        {
            title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
            img: '../../local_image/book_ex.jpg',
            quantity: 2,
            b_date: '10 December 2022',
            d_date: '13 December 2022',
            late: false
        },
        {
            title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
            img: '../../local_image/book_ex.jpg',
            quantity: 1,
            b_date: '15 December 2022',
            d_date: '16 December 2022',
            late: true
        },
        {
            title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
            img: '../../local_image/book_ex.jpg',
            quantity: 2,
            b_date: '10 December 2022',
            d_date: '13 December 2022',
            late: false
        },
        {
            title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
            img: '../../local_image/book_ex.jpg',
            quantity: 1,
            b_date: '15 December 2022',
            d_date: '16 December 2022',
            late: true
        },
    ])
    return (
        <div className="grid
        grid-cols-1 lg:grid-cols-2
        gap-7">
            {borrowList.map((item, index) =>
                <>
                    {/* Book card */}
                    <div className="w-full p-2 flex border-[1px] border-black relative" key={index}>
                        <div className="w-[50%] xl:w-[35%]">
                            <img src={require('../../local_image/book_ex.jpg')} className=" xl:w-full cursor-pointer" alt='book' />
                        </div>
                        <div className="w-full xl:w-[65%] p-2">
                            <p className="text-lg line-clamp-2">{item.title}</p>
                            <div className="flex">
                                <p className="mt-2"> <b>Quantity</b> : {item.quantity} ea</p>
                            </div>
                            {/* Borrow Date */}
                            <div className="mt-5">
                                <div className="w-full sm:flex">
                                    <div className="sm:w-[40%]">
                                        <p className="">Borrow Date</p>
                                    </div>
                                    <p className="">{item.b_date}</p>
                                </div>
                                <div className="w-full sm:flex">
                                    <div className="sm:w-[40%]">
                                        <p className="Gentium-B-font">Due Date</p>
                                    </div>
                                    <p className="Gentium-B-font">{item.d_date}</p>
                                </div>
                            </div>
                            {item.late ?
                                <p className="mt-2">You are lated! <u className="text-red-500 cursor-pointer ml-3">Pay a fine</u></p>
                                :
                                null
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}