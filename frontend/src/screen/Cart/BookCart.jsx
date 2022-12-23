import React, { useEffect, useState } from "react";

import { BsCheckCircleFill } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {  useSelector } from "react-redux";
import axios from "axios";


export const BookCart = () => {
    const location = useLocation()
    const user = useSelector((state) => state.user_data.user)
    const navigate = useNavigate()
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [BookData, setBookData] = useState([])
    const borrowed = () => {
        let arr = JSON.parse(secureLocalStorage.getItem("books"))
        if(!arr || BookData.length === 0){
            alert("ไม่มีของอยู่ในนี้")
        }
        else{
            setIsActiveModal(true)
            //Add to Borrow service (หลังทำ login)
            //{
            // status : "PENDING"
            // borrow_date : "current date"
            // due_date : "หลังจากวันที่ยืม 1 สัปดาห์"
            // late : false
            // userId : ไอดีของ user
            // booksId : [
            //   "adasdasdasds",
            //   "asd4po32p25l" --ตัวอย่างเฉยๆ-- เก็บเป็น id ของหนังสือที่ยืม
            // ]
            //}
            //หลังจากส่งไป create ปุ๊ป ไปหักจำนวนหนังสือตามที่ user ได้ยืมไป
            console.log(arr)
            let booksId = []
            let ts = new Date().toISOString()
            let bdate = new Date()
            let ddate = new Date()
            arr.forEach(element => {
                for(let i=0;i<element.quantity;i++){
                    booksId.push(element._id)
                }
            });
            ddate.setDate(bdate.getDate()+7)
            let borrowBooks = {
                status:"PENDING",
                late:false,
                userId:user._id,
                booksId:booksId,
                borrow_date:bdate.toISOString().slice(0,10),
                due_date:ddate.toISOString().slice(0,10)
            }
            console.log(user, borrowBooks)
            axios.post("http://localhost:8082/borrow-service/borrow", JSON.stringify(borrowBooks), {
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((res) => {
                console.log(res.status + " " + res.statusText + res.data)
                let addPayment = {
                    userId: user._id,
                    reserveId: "",
                    status: "SUCCESS",
                    timestamp: ts.substring(0, 10) + " " + ts.substring(11, 19),
                    price: 15,
                    borrowId: res.data
                  }
                  console.log(addPayment)
                  axios.post("http://localhost:8082/payment-service/payment", JSON.stringify(addPayment), {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }).then((res) => console.log(res.status + " " + res.statusText + res.data))
            })
            

            // add เสร็จล้างค่า localStorage
            secureLocalStorage.removeItem("books")
            setBookData([])
        }
    }
    const incrementQuantity = (ind) => {
        let foundtitle;
        setBookData(BookData.map((item, index) => {
            if (index === ind) {
                foundtitle = item.title
                return { ...item, quantity: item.quantity + 1 }
            }
            else {
                return item
            }
        }))
        // console.log(BookData[index])
        if(!!foundtitle){
            let arr = JSON.parse(secureLocalStorage.getItem("books"))
            for(let book of arr){
                if(book.title === foundtitle){
                    book.quantity++
                    break
                }
            }
            secureLocalStorage.setItem('books', JSON.stringify(arr))
        }
        
    }
    const decrementQuantity = (ind) => {
        let foundtitle;
        setBookData(BookData.map((item, index) => {
            if (index === ind) {
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
            let arr = JSON.parse(secureLocalStorage.getItem("books"))
            for(let book of arr){
                if(book.title === foundtitle){
                    if(book.quantity > 1){
                        book.quantity--
                        break
                    }
                }
            }
            secureLocalStorage.setItem('books', JSON.stringify(arr))
        }
    }
    const deleteBook = (index) => {
        let arr = JSON.parse(secureLocalStorage.getItem("books"))
        arr.splice(index, 1)
        secureLocalStorage.setItem('books', JSON.stringify(arr))
        let copyBooks = [...BookData]
        copyBooks.splice(index, 1)
        setBookData(copyBooks)
        window.location.reload()
    }
    useEffect(() => {
        let books = JSON.parse(secureLocalStorage.getItem('books'))
        if(location.pathname === "/borrow-cart" && !books){
            navigate("/")
        }
        else{
            setBookData(!books ? [] : books)
        }
    }, [])
    return (
        <>
            {isActiveModal ?
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setIsActiveModal(false)
                                                                                                                                            window.location.reload() }}>
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
                        {BookData.length !== 0 ?
                            <>
                                {BookData.map((item, index) =>
                                    <>
                                        <div className="bg-white drop-shadow-xl md:flex mt-5" key={index}>
                                            <img src={item.image} className="w-full md:w-[180px] md:h-[220px]" alt="profile-pic" />
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
                        {BookData.length !== 0 ?
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
                            {BookData.length !== 0 ?
                                <p className="absolute right-0">x{BookData.map(item => item.quantity).reduce((a, b) => a + b)}</p>
                                : null}
                        </div>
                    </div>
                    <div className="w-[100%] h-[50px] flex items-center justify-center bg-black mt-5 cursor-pointer"
                        onClick={() => { borrowed() }}>
                        <p className="text-white text-xl">Borrow</p>
                    </div>
                </div>
            </div>
        </>
    )
}