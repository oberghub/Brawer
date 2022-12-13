import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsBookmark } from 'react-icons/bs'
import {AiOutlineClear} from 'react-icons/ai'

export const Book = () => {
    const [BookData, setBookData] = useState([
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg',
         lang : "English",
         type : "Programming"
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../../local_image/think_java_covr_large.png',
         lang : "Thai",
         type : "Programming"
        },
        {title : 'War of France',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg',
         lang : "France",
         type : "War"
        },
        {title : 'Siam Sport',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg',
         lang : "Thai",
         type : "Sport"
        },
        {title : 'Go to CNX',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../../local_image/book_ex.jpg',
         lang : "Thai",
         type : "Travel"
        },
    ])
    const navigate = useNavigate()
    const toggleslide = () => {
        document.getElementById('slide-toggle').classList.toggle('invisible')
        document.getElementById('slide-toggle').classList.toggle('translate-x-[-100%]');
        document.getElementById('wall-toggle').classList.toggle('hidden')
    }
    //เก็บ type ของหนังสือแบบ Distinct
    const filterTypeData = [...new Set(BookData.map((item) => item.type))]
    const filterLangData = [...new Set(BookData.map(item => item.lang))]
    //เก็บ value ที่จะเอาไป filter หาหนังสือ
    const [filterLangStack, setFilterLangStack] = useState([])
    const [filterTypeStack, setFilterTypeStack] = useState([])

    const handleLangFilter = (e) => { //ถ้ามีการติ๊ก CheckBox ฟังก์ชันนี้จะทำงาน
        let state = e.target.checked
        let value = e.target.value
        let filterStackCopy = [...filterLangStack]
        if(state){
            filterStackCopy.push(value)
            setFilterLangStack(filterStackCopy)
        }
        else{
            filterStackCopy.splice(filterLangStack.indexOf(value), 1)
            setFilterLangStack(filterStackCopy)
        }
        // console.log(filterStackCopy)
    }
    const handleTypeFilter = (e) => { //ถ้ามีการติ๊ก CheckBox ฟังก์ชันนี้จะทำงาน
        let state = e.target.checked
        let value = e.target.value
        let filterStackCopy = [...filterTypeStack]
        if(state){
            filterStackCopy.push(value)
            setFilterTypeStack(filterStackCopy)
        }
        else{
            filterStackCopy.splice(filterTypeStack.indexOf(value), 1)
            setFilterTypeStack(filterStackCopy)
        }
        // console.log(filterStackCopy)
    }
    const [showBooks, setShowBooks] = useState([...BookData]) //เอาไว้ show ข้อมูลในหน้าเว็บ

    useEffect(() => { //ถ้ามีการติ๊กใน Checkbox useEffect จะทำงาน
        let filterBook = [...BookData]
        if(filterLangStack.length != 0){
            filterBook = filterBook.filter(item => {
                for(let filter of filterLangStack){
                    if(item.lang == filter){
                        return true
                    }
                }
            })
        }
        if(filterTypeStack.length != 0){
            filterBook = filterBook.filter(item => {
                for(let filter of filterTypeStack){
                    if(item.type == filter){
                        return true
                    }
                }
            })
        } 
        setShowBooks(filterBook)
    }, [filterLangStack, filterTypeStack]) //[filterLangStack, filterTypeStack] ใส่ค่าไว้เก็บการเปลี่ยนแปลง
    return (
        <>
            <div className="w-full flex relative min-[480px]:justify-center">
                {/* Filter Bar */}
                <div className="hidden sm:block">
                    <div id="wall-toggle" className="hidden sm:w-[280px] h-[90px]"></div>
                </div>
                <div id="slide-toggle" className="w-full sm:w-[280px] h-screen bg-white fixed left-0 mt-[32px] sm:mt-[64px] z-30 drop-shadow-2xl p-[1.5em] duration-300 ease-out transition-all translate-x-[-100%] invisible">
                    {/* Top of bar */}
                    <div className="relative flex border-b-[0px] border-gray-400">
                        <p onClick={() => {}} className="text-4xl Gentium-B-font mb-3">Filters</p>
                        <div className="absolute right-0 cursor-pointer m-1" onClick={() => {toggleslide()}}>
                            <svg height="20px" viewBox="0 0 512 512" width="20px">
                                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                            </svg>
                        </div>
                    </div>
                    {/* Lang FIlter */}
                    <div className="border-b-[1px] border-gray-400 mt-[2em] mb-3">
                        <p className="text-2xl Gentium-B-font mb-3">Languange</p>
                    </div>
                    {filterLangData.map((item, index) => <>
                            <div className="flex items-center mb-2">
                                <input id="default-checkbox" type="checkbox" value={item} onChange={handleLangFilter} className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <p className="ml-2 text-lg Gentium-B-font cursor-default">{item}</p>
                            </div>
                        </>)}
                    {/* Type Filter */}
                    <div className="border-b-[1px] border-gray-400 mt-[2em] mb-3">
                        <p className="text-2xl Gentium-B-font mb-3">Genre</p>
                    </div>
                    {filterTypeData.map((item, index) => <>
                            <div className="flex items-center mb-2">
                                <input id="default-checkbox" type="checkbox" value={item} onChange={handleTypeFilter} className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                <p className="ml-2 text-lg Gentium-B-font cursor-default">{item}</p>
                            </div>
                        </>)}
                    {/* <div onClick={() => {}} className="rounded text-white w-full h-[40px] bg-black flex items-center justify-center mt-5 cursor-pointer">
                        <p>Let's Go</p>
                    </div> */}
                 </div>

                {/* Book grid */}
                <div className="">
                    <div className="w-full h-[100px] lg:h-[200px] flex items-center p-5 min-[945px]:p-10 mt-[3em] slide-in-l">
                        <GiHamburgerMenu size={30} className="cursor-pointer mr-5" onClick={() => {toggleslide()}} />
                        <p className="text-4xl Gentium-B-font">All Books</p>
                        {showBooks.length == 0 ? 
                        <p className="text-2xl">(Filter Doesn't Match)</p>
                        :
                        null
                        }
                    </div>
                    <div className="w-full h-auto flex justify-center items-center">
                        <div className="grid  w-full
                                        grid-cols-1 min-[480px]:grid-cols-2 min-[945px]:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
                                        gap-10
                                        p-5 min-[945px]:p-10
                                        ">
                                {showBooks.map((book, index) =>                             
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