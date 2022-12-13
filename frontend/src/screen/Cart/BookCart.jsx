import React, { useEffect, useState } from "react";

import { BsCheckCircleFill } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import {RiDeleteBin5Line} from 'react-icons/ri'

export const BookCart = () => {
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [BookData, setBookData] = useState([])
    const openModal = () => {
        setIsActiveModal(true)
        // setTimeout(() => {
        //     setIsActiveModal(false)
        //     setCountDown(countDown--)
        //     console.log(countDown)
        // }, 3000);
    }
    const incrementQuantity = (ind) => {
        let foundtitle;
        setBookData(BookData.map((item, index) => {
            if (index == ind) {
                foundtitle = item.title
                return { ...item, quantity: item.quantity + 1 }
            }
            else {
                return item
            }
        }))
        // console.log(BookData[index])
        if(!!foundtitle){
            let arr = JSON.parse(localStorage.getItem("books"))
            for(let book of arr){
                if(book.title === foundtitle){
                    book.quantity++
                    break
                }
            }
            localStorage.setItem('books', JSON.stringify(arr))
        }
        
    }
    const decrementQuantity = (ind) => {
        let foundtitle;
        setBookData(BookData.map((item, index) => {
            if (index == ind) {
                foundtitle = item.title
                if (item.quantity === 1) {
                    return { ...item, quantity: 1 }
                }
                return { ...item, quantity: item.quantity - 1 }
            }
            else {
                return item
            }
        }))
        if(!!foundtitle){
            let arr = JSON.parse(localStorage.getItem("books"))
            for(let book of arr){
                if(book.title === foundtitle){
                    if(book.quantity > 1){
                        book.quantity--
                        break
                    }
                }
            }
            localStorage.setItem('books', JSON.stringify(arr))
        }
    }
    const deleteBook = (index) => {
        let arr = JSON.parse(localStorage.getItem("books"))
        arr.splice(index, 1)
        localStorage.setItem('books', JSON.stringify(arr))
        let copyBooks = [...BookData]
        copyBooks.splice(index, 1)
        setBookData(copyBooks)
    }
    useEffect(() => {
        let books = JSON.parse(localStorage.getItem('books'))
        setBookData(!books ? [] : books)
    }, [])
    return (
        <>
            {isActiveModal ?
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setIsActiveModal(false) }}>
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
            <div className="w-full h-screen m-auto flex relative pt-[4em]">
                <div className="md:w-[70%] p-10 md:border-r-[1px] md:border-gray-200 slide-in-l">
                    <p className="text-4xl Gentium-B-font">My Cart</p>
                    <div className="mt-5 w-full grid grid-cols-1 min-[440px]:grid-cols-2 gap-3 md:block">
                        {BookData.length != 0 ?
                            <>
                                {BookData.map((item, index) =>
                                    <>
                                        <div className="bg-white drop-shadow-xl md:flex mt-5" key={index}>
                                            <img src={require('../../local_image/think_python.png')} className="w-full md:w-[180px] md:h-[220px]" alt="profile-pic" />
                                            <div className="w-full md:w-[70%] p-5 md:m-0 m-auto">
                                                <p className="text-xl line-clamp-4 lg:text-2xl">{item.title}</p>
                                                <div className="flex">
                                                    <AiOutlineMinus className="mt-5 mr-5 cursor-pointer" onClick={() => { decrementQuantity(index) }} size={25} />
                                                    <p className="text-xl mt-5">x{item.quantity}</p>
                                                    <AiOutlinePlus className="mt-5 ml-5 cursor-pointer" onClick={() => { incrementQuantity(index) }} size={25} />
                                                </div>
                                                <RiDeleteBin5Line onClick={() => deleteBook(index)} className="cursor-pointer mt-5" size={20} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="slide-in-r w-full md:w-[500px] p-10 bg-white fixed md:static left-0 bottom-0 z-30">
                    <p className="Gentium-B-font text-4xl">Cart Totals</p>
                    <div className="mt-5">
                        {BookData.length != 0 ?
                            <>
                                {BookData.map((item, index) =>
                                    <>
                                        <div className="relative flex">
                                            <div className="w-[350px]">
                                                <p className="text-xl Gentium-B-font line-clamp-1">{item.title}</p>
                                            </div>
                                            <p className="absolute right-0">x{item.quantity}</p>
                                        </div>
                                    </>
                                )}
                            </>
                            : null}
                        <div className="mt-5 relative flex">
                            <p className="text-xl Gentium-B-font">Total</p>
                            {BookData.length != 0 ?
                                <p className="absolute right-0">x{BookData.map(item => item.quantity).reduce((a, b) => a + b)}</p>
                                : null}
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