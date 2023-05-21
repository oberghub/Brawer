import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userdata } from "../../userSlice";
const dns = "https://2igwz38ku9.execute-api.us-east-1.amazonaws.com/dev"
export const Favourite = () => {
    const user = useSelector((state) => state.user_data.user)
    const dispatch = useDispatch()
    const [BookData, setBookData] = useState([
    ])
    const [isLoaded, setIsLoaded] = useState(false)
    const navigate = useNavigate()
    const removeBookmark = (bookid) => {
        let newfavs = [...user.favouriteBooks]
        let index = newfavs.indexOf(bookid)
        if (index > -1) {
            newfavs.splice(index, 1)
        }
        let updateUser = {
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email,
            favouriteBooks: newfavs
        }
        console.log(user, updateUser)
        axios.post("http://localhost:8082/user-service/user", JSON.stringify(updateUser), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => { console.log(res.status + " " + res.statusText) })
        dispatch(userdata({ ...user, favouriteBooks: newfavs }))
    }
    //get fav book
    useEffect(() => {
        let requestBook = user.favouriteBooks
        console.log(requestBook, user)
        // console.log("http://localhost:8082/book-service/book/ids/" + requestBook.join(","))
        if (requestBook.length > 0 && user.id != "") {
            let books = []
            for (let bookid of requestBook){
                axios.get(dns + "/books/" + bookid, {
                }).then((res) => {
                    books.push(res.data)
                    
                }).catch((e) => console.log(e))
            }
            setBookData(books)
            setIsLoaded(true)
            // axios.get(dns + "/books/" + requestBook.join(","), {
            // }).then((res) => {
            //     // setBookData(res.data)
            //     setBookData([])
            //     console.log(res.data)
            //     setIsLoaded(true)
            // }).catch((e) => console.log(e))
        } else {
            setBookData([])
        }
        console.log(BookData)
    }, [user])

    // const getFavBooks = () => {
    //     axios.get("http://localhost:8082/book-service/book/")
    // }
    return (
        <>
            {/* Book grid */}
            <div className="ml-auto mr-auto">
                {isLoaded ?
                    <p className='text-3xl Gentium-B-font'>Your Favourite</p>
                    :
                    <p className='text-3xl Gentium-B-font'>Your Favourite (Loading...)</p>
                }
                <div className="w-full h-auto flex justify-center">
                    <div className="grid 
                                    grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4
                                    gap-3
                                    ">
                        {BookData.map((book, index) =>
                            <div key={index} className="w-full slide-in-r
                                    h-auto
                                    bg-white
                                    drop-shadow-xl
                                    p-5 md:p-2 lg:p-5">
                                {/* Book Image */}
                                <img src={book.image} className="w-full h-auto cursor-pointer" alt='book'
                                    onClick={() => { navigate("/book-info", { state: { item: book } }) }} />
                                {/* Book Title */}
                                <div className="w-full
                                                    h-auto
                                                    mt-2 pl-2">
                                    <p className="leading-tight line-clamp-2 text-xl">{book.title}</p>
                                </div>
                                <div className="w-full
                                                    h-auto
                                                    mt-5 pl-2 relative">
                                    <BsFillBookmarkFill size={25} color={"gold"} className="cursor-pointer" onClick={() => { removeBookmark(book.id) }} />
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}