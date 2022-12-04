import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBookmarkFill } from 'react-icons/bs'

export const Favourite = () => {
    const BookData = useState([
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        },
        {title : 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
         img : '../local_image/think_java_covr_large.png'
        },
        {title : 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
         desc : 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
         img : '../local_image/book_ex.jpg'
        }
    ])
    const navigate = useNavigate()
    return (
        <>
            {/* Book grid */}
            <div className="ml-auto mr-auto">
                <div className="w-full h-auto flex justify-center">
                    <div className="grid 
                                    grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4
                                    gap-3
                                    ">
                        {BookData[0].map((book, index) =>
                            <div key={index} className="w-full
                                    h-auto
                                    border-[1px]
                                    border-black drop-shadow-lg
                                    p-5 md:p-2 lg:p-5">
                                {/* Book Image */}
                                <img src={require('../../local_image/book_ex.jpg')} className="w-full h-auto cursor-pointer" alt='book'
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
                                    <BsFillBookmarkFill size={25} color={"gold"} className="cursor-pointer" onClick={() => { console.log("added to bookmark") }} />
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}