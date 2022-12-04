import React, { useState } from "react";

import { BsCheckCircleFill } from 'react-icons/bs'

export const BookCart = () => {
    const [isActiveModal, setIsActiveModal] = useState(false)
    let [countDown, setCountDown] = useState(3)
    const BookData = useState([
        {
            title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
            img: '../local_image/book_ex.jpg'
        },
        {
            title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
            img: '../local_image/think_java_covr_large.png'
        },
        {
            title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
            img: '../local_image/book_ex.jpg'
        },
        {
            title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
            img: '../local_image/think_java_covr_large.png'
        },
        {
            title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
            desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
            img: '../local_image/book_ex.jpg'
        }
    ])
    const openModal = () => {
        setIsActiveModal(true)
        // setTimeout(() => {
        //     setIsActiveModal(false)
        //     setCountDown(countDown--)
        //     console.log(countDown)
        // }, 3000);
    }
    return (
        <>
            {isActiveModal ?
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => {setIsActiveModal(false)}}>
                        <div className="bg-white p-2 rounded w-72 h-72 flex items-center justify-center">
                            <div className="text-center">
                                <BsCheckCircleFill size={100} color={'green'} className="m-auto" />
                                <p className="text-4xl Gentium-B-font">Success</p>
                                <p className="m-auto">Click to back to main menu</p>
                            </div>
                        </div>
                    </div>
                </>
                : null}
            <div className="w-full h-screen m-auto flex relative">
                <div className="md:w-[70%] p-10 m-auto md:border-r-[1px] md:border-gray-200">
                    <p className="text-4xl Gentium-B-font"><b>My Cart</b></p>
                    <div className="mt-5 w-full grid grid-cols-1 min-[440px]:grid-cols-2 gap-3 md:block">
                        {BookData[0].map((item, index) =>
                            <>
                                <div className="bg-white drop-shadow-xl md:flex mt-5" key={index}>
                                    <img src={require('../../local_image/think_python.png')} className="w-full md:w-[180px] md:h-[220px]" alt="profile-pic" />
                                    <div className="w-full md:w-[70%] p-5 md:m-0 m-auto">
                                        <p className="text-xl line-clamp-4 lg:text-2xl">{item.title}</p>
                                        <p className="text-xl mt-5">x1</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-[500px] p-10 bg-white fixed md:static left-0 bottom-0 z-30">
                    <p className="Gentium-B-font text-4xl">Cart Totals</p>
                    <div className="mt-5">
                        <div className="relative flex">
                            <p className="text-xl Gentium-B-font">Think Python</p>
                            <p className="absolute right-0">x1</p>
                        </div>
                        <div className="relative flex">
                            <p className="text-xl Gentium-B-font">Think Java</p>
                            <p className="absolute right-0">x1</p>
                        </div>
                        <div className="relative flex">
                            <p className="text-xl Gentium-B-font">คำคมกระตุกจิตกระชากใจ</p>
                            <p className="absolute right-0">x2</p>
                        </div>
                        <div className="mt-5 relative flex">
                            <p className="text-xl Gentium-B-font">Total</p>
                            <p className="absolute right-0">x4</p>
                        </div>
                    </div>
                    <div className="w-[100%] h-[50px] flex items-center justify-center bg-black mt-5 cursor-pointer"
                        onClick={() => { openModal() }}>
                        <p className="text-white text-xl">Borrow</p>
                    </div>
                </div>
            </div>
        </>
    )
}