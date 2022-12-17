import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import { BsBookmark } from 'react-icons/bs'
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
export const BookInfo = () => {
    const location = useLocation()
    const [addState, setAddState] = useState("Add to Cart")
    const addToCart = (item) => {

        //เช็คว่ายังไม่ได้สร้าง Localstorage 'books' ใช่มั้ย ถ้าไม่มีมัน return เป็น null ใส่ ! หน้า null จะ = true ก็คือ เข้าไปทำใน if
        if(!JSON.parse(secureLocalStorage.getItem("books"))){
            let arr = []
            arr.push({...item, quantity : 1})
            secureLocalStorage.setItem('books', JSON.stringify(arr))
        }
        else{
            let arr = JSON.parse(secureLocalStorage.getItem("books"))
            var isDouble = null
            for(let book of arr){
                //จำลองโดยการเช็คว่าชื่อหนังสือเหมือนกัน
                if(book.title === item.title){
                    book.quantity++
                    isDouble = true
                    break
                }
                else{
                    isDouble = false
                }
            }
            if(!isDouble){
                arr.push({...item, quantity : 1})
            }
            secureLocalStorage.setItem('books', JSON.stringify(arr))
        }

        setAddState("Add to cart completed.")
        setTimeout(() => {
            setAddState("Add to Cart")
        }, 2000)
    }
    return (
        <>
            <div className="w-full h-auto xl:h-[890px] flex justify-center item-center xl:items-end">

                {/* Content container */}
                <div className="w-full xl:w-[1280px]
                                h-auto xl:h-[755px] 
                                mt-[3em]
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
                            <img src={location.state.item.image} className="w-[295px] xl:w-[365px] 
                                                                                        h-[435px] xl:h-[535px]  
                                                                                        xl:border-[1px] border-black
                                                                                        absolute bottom-0" alt='book' />
                        </div>
                    </div>
                    {/* Book Container < sm */}
                    <div className="w-full flex justify-center mt-[2em] sm:hidden">
                        <img src={location.state.item.image} className="w-[80%] h-auto" alt='book' />
                    </div>
                    {/* Text Container */}
                    <div className="w-[80%] sm:w-[60%]
                                    h-[560px] pt-[2em]
                                    ml-auto mr-auto xl:ml-0 xl:mr-0">
                        {/* Text Title */}
                        <div className="w-full h-[100px]">
                            <p className="text-4xl line-clamp-2">{location.state.item.title}</p>
                        </div>
                        {/* Add to list button */}
                        <div className="w-full h-auto flex">
                            {/* Button */}
                            <div className="w-[80%] h-[50px] flex justify-center items-center bg-black cursor-pointer" onClick={() => {addToCart(location.state.item)}}>
                                <p className="text-white text-lg">{addState}</p>
                            </div>
                            {/* Bookmark icon */}
                            <div className="md:w-[20%] md:h-[50px] flex items-center">
                                <BsBookmark size={25} className="cursor-pointer ml-[1em] sm:ml-[2em]" onClick={() => {console.log(location.state.item.img)}} />
                            </div>
                        </div>
                        {/* Description */}
                        <div className="w-full mt-[2em]">
                            <p className="text-4xl mb-[0.5em] Gentium-B-font">Description</p>
                            <div className="w-full h-auto">
                                <p className="text-xl line-clamp-6 xl:line-clamp-none">{location.state.item.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}