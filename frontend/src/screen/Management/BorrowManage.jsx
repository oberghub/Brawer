import React, {useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
const BorrowManage = () => {
  const [borrowList, setBorrowList] = useState([
    {
        b_date: '15 December 2022',
        d_date: '16 December 2022',
        late: true,
        books: [
            {
                title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
                desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
                img: '../../local_image/book_ex.jpg',
                quantity: 2,
            },
            {
                title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
                desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
                img: '../../local_image/book_ex.jpg',
                quantity: 1,
            },
        ],
        borrowId : 'ifmw-wij41-dk241-skdn',
        borrower : "shwpasp",
        status : 'Pending'
    },
    {
        b_date: '15 December 2022',
        d_date: '19 December 2022',
        late: false,
        books: [
            {
                title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
                desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
                img: '../../local_image/book_ex.jpg',
                quantity: 2,
            },
        ],
        borrowId : 'eqmw-wdqwj41-dk241-s344n',
        borrower : "dsadq12121",
        status : 'Success'
    }
])
  return (
    <div>
      <div className="w-full pt-[6em] px-[1em]">
        <table className='w-[768px] md:w-full text-center'>
          <thead className='h-[60px]'>
            <tr className='text-2xl Gentium-B-font'>
              <th>Borrow Id</th>
              <th>Borrower</th>
              <th>Status</th>
              <th>See Detail</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {borrowList.map((item, index) =>
              <tr className='h-[2.5em]' style={{backgroundColor : index%2 == 0 ? "#2F5D62" : "white", color : index%2==0 ? 'white' : 'black'}}>
                <td>{item.borrowId}</td>
                <td>{item.borrower}</td>
                <td>{item.status}</td>
                <td className='Gentium-R-font'>
                  <div className='flex items-center justify-center'>
                  <AiOutlineSearch size={30} className="cursor-pointer" /> 
                  </div>
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BorrowManage
