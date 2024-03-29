import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsBookmark , BsFillBookmarkFill} from 'react-icons/bs'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { userdata } from "../../userSlice";
export const Book = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user_data.user)
    const dispatch = useDispatch()

    // //เก็บ type ของหนังสือแบบ Distinct
    // const [filterTypeData, setFilterTypeData] = useState([])
    // const [filterLangData, setFilterLangData] = useState([])
    // //เก็บ value ที่จะเอาไป filter หาหนังสือ
    // const [filterLangStack, setFilterLangStack] = useState([])
    // const [filterTypeStack, setFilterTypeStack] = useState([])

    // const handleLangFilter = (e) => { //ถ้ามีการติ๊ก CheckBox ฟังก์ชันนี้จะทำงาน
    //     let state = e.target.checked
    //     let value = e.target.value
    //     let filterStackCopy = [...filterLangStack]
    //     if (state) {
    //         filterStackCopy.push(value)
    //         setFilterLangStack(filterStackCopy)
    //     }
    //     else {
    //         filterStackCopy.splice(filterLangStack.indexOf(value), 1)
    //         setFilterLangStack(filterStackCopy)
    //     }
    //     console.log(filterStackCopy)
    // }
    // const handleTypeFilter = (e) => { //ถ้ามีการติ๊ก CheckBox ฟังก์ชันนี้จะทำงาน
    //     let state = e.target.checked
    //     let value = e.target.value
    //     let filterStackCopy = [...filterTypeStack]
    //     if (state) {
    //         filterStackCopy.push(value)
    //         setFilterTypeStack(filterStackCopy)
    //     }
    //     else {
    //         filterStackCopy.splice(filterTypeStack.indexOf(value), 1)
    //         setFilterTypeStack(filterStackCopy)
    //     }
    //     console.log(filterStackCopy)
    // }
    // useEffect(() => { //ถ้ามีการติ๊กใน Checkbox useEffect จะทำงาน
    //     let filterBook = [...showBooks]
    //     if (filterLangStack.length != 0) {
    //         filterBook = filterBook.filter(item => {
    //             for (let filter of filterLangStack) {
    //                 if (item.language == filter) {
    //                     return true
    //                 }
    //             }
    //         })
    //     }
    //     if(filterTypeStack.length != 0){
    //         filterBook = filterBook.filter(item => {
    //             for(let filter of filterTypeStack){
    //                 if(!!item.genres.find(find => find === filter)){
    //                     return true
    //                 }
    //             }
    //         })
    //     }
    //     const result = filterLangStack.length == 0 && filterTypeStack.length == 0 ? cloneBooks : filterBook
    //     setShowBooks(result)
    // }, [filterLangStack, filterTypeStack]) //[filterLangStack, filterTypeStack] ใส่ค่าไว้เก็บการเปลี่ยนแปลง
    //Get Data When First Time Render
    const [showBooks, setShowBooks] = useState([]) //เอาไว้ show ข้อมูลในหน้าเว็บ
    const [isLoaded, setIsLoaded] = useState(false)
    const addBookmark = (bookid) =>{

        let newfavs = [...user.favouriteBooks,bookid]
        let updateUser = {
            _id:user._id,
            role:user.role,
            name:user.name,
            email:user.email,
            favouriteBooks:newfavs
        }
        console.log(user, updateUser)
        axios.put("http://localhost:8082/user-service/user", JSON.stringify(updateUser), {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((res) => {console.log(res.status + " " + res.statusText)})
        dispatch(userdata({...user,favouriteBooks:newfavs}))
    }
    const removeBookmark = (bookid) =>{
        let newfavs = [...user.favouriteBooks]
        let index = newfavs.indexOf(bookid)
        if(index > -1){
            newfavs.splice(index, 1)
        }
        let updateUser = {
            _id:user._id,
            role:user.role,
            name:user.name,
            email:user.email,
            favouriteBooks:newfavs
        }
        console.log(user, updateUser)
        axios.put("http://localhost:8082/user-service/user", JSON.stringify(updateUser), {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((res) => {console.log(res.status + " " + res.statusText)})
        dispatch(userdata({...user,favouriteBooks:newfavs}))
        
    }
    useEffect(() => {
        axios.get("http://localhost:8082/book-service/book/all", {
        }).then((res) => {
            setShowBooks([...res.data])
            setIsLoaded(true)
        }).catch((e) => console.log(e))
    }, [])
    return (
        <>
            <div className="w-full flex relative min-[480px]:justify-center">
                {/* Book grid */}
                {isLoaded ?
                    <div className="">
                        <div className="w-full h-[100px] flex p-5 min-[945px]:p-10 mt-[3em] slide-in-l">

                            {/* <GiHamburgerMenu size={30} className="cursor-pointer mr-5" onClick={() => { toggleslide() }} /> */}
                            <p className="text-4xl Gentium-B-font">All Books</p>
                            {/* {showBooks.length == 0 ?
                                <p className="text-2xl">(Filter Doesn't Match)</p>
                                :
                                null
                            } */}
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
                                        <img src={book.image} alt='book' className="w-full cursor-pointer"
                                                onClick={() => { navigate("/book-info", { state: { item: book } }) }} />
                                        {/* Book Title */}
                                        <div className="w-full
                                                h-auto
                                                mt-5 pl-2">
                                            <p className="leading-tight line-clamp-2 text-xl">{book.title}</p>
                                        </div>
                                        <div className="w-full
                                                h-auto
                                                mt-5 pl-2 relative">
                                            {user.favouriteBooks? 
                                            user.favouriteBooks.filter((e)=>e==book._id)[0]? 
                                            <BsFillBookmarkFill size={25} color={"gold"} className="cursor-pointer" onClick={() => { removeBookmark(book._id) }} />: 
                                            <BsBookmark size={25} className="cursor-pointer" onClick={() => { addBookmark(book._id) }} />
                                            :""}
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="pt-[5em] text-4xl">Loading...</div>
                }
            </div>
        </>
    )
}