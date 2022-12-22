import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBookmarkFill,BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userdata } from "../../userSlice";

export const Favourite = () => {
    const user = useSelector((state) => state.user_data.user)
    const dispatch = useDispatch()
    const [BookData, setBookData] = useState([
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         image : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         image : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         image : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         image : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         image : '../local_image/book_ex.jpg'
        }
    ])
    const navigate = useNavigate()
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
    //get fav book
    useEffect(()=>{
        let requestBook = user.favouriteBooks
        console.log(requestBook, user)
        if(requestBook.length > 0 && user._id != ""){
            axios.post("http://localhost:8082/book-service/book/ids",requestBook, {
            }).then((res) => {
                setBookData(res.data)
            }).catch((e) => console.log(e))
        }else{
            setBookData([])
        }
    },[user])
    return (
        <>
            {/* Book grid */}
            <div className="ml-auto mr-auto">
                <p className='text-3xl Gentium-B-font'>Your Favourite</p>
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
                                    <BsFillBookmarkFill size={25} color={"gold"} className="cursor-pointer" onClick={() => { removeBookmark(book._id) }} />
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}