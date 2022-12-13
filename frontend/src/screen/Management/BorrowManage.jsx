import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const BorrowManage = () => {
  const [borrowList, setBorrowList] = useState([
    {
      b_date: '15 December 2022',
      d_date: '16 December 2022',
      late: false,
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
      borrowId: 'ifmw-wij41-dk241-skdn',
      borrower: "shwpasp",
      status: 'Pending'
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
      borrowId: 'eqmw-wdqwj41-dk241-s344n',
      borrower: "dsadq12121",
      status: 'Success'
    }
  ])
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
  const [confirmModal, setConfirmModal] = useState(false)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [confirmState, setConfirmState] = useState("")

  const [b_date, setB_date] = useState("")
  const [d_date, setD_date] = useState("")
  const [late, setLate] = useState(null)
  const [books, setBooks] = useState(null)
  const [borrowId, setBorrowId] = useState("")
  const [borrower, setBorrower] = useState("")
  const [status, setStatus] = useState("")
  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };
  const confirmStatus = () => {
    // if(confirmState == "Confirm"){
    //   console.log("Eiei")
    // }
    // else{
    //   console.log("ISud")
    // }
    setConfirmModal(false)
  }
  const seeADetail = (data) => {
    setB_date(data.b_date)
    setD_date(data.d_date)
    setLate(data.late)
    setBooks(data.books)
    setBorrowId(data.borrowId)
    setBorrower(data.borrower)
    setStatus(data.status)
  }
  return (
    <div>
      {confirmModal ?
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded flex justify-center slide-down-fade">
              <div className="">
                <div className='w-full border-b-[1px] border-gray-300 relative'>
                  <p className='text-3xl Gentium-B-font mb-5'>Type To {confirmState} Booking</p>
                  <div onClick={() => {
                    setConfirmModal(false)
                    setConfirmText("")
                  }} className="absolute right-0 top-0 cursor-pointer" >
                    <svg height="20px" viewBox="0 0 512 512" width="20px">
                      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                    </svg>
                  </div>
                </div>
                <Box
                  className='my-8'
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <p className='text-xl mb-3'>Type <b>'{confirmState}'</b> to confirm a booking.</p>
                  <TextField fullWidth placeholder={confirmState} label="" id="typeToConfirm" value={confirmText} onChange={handleChange} />
                </Box>
                <div className='w-full flex items-center justify-center gap-3 mt-7'>
                  {confirmText == confirmState ?
                    <div onClick={() => { confirmStatus() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                      <p className='text-2xl'>Accept</p>
                    </div>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
        </>
        :
        null
      }
      {isActiveModal ?
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-2 rounded flex items-center justify-center slide-down-fade">
              {/* Content */}
              <div className="w-[320px] min-[768px]:w-[768px] p-5">
                {/* Header */}
                <div className="w-full flex relative">
                  <div onClick={() => { setIsActiveModal(false) }} className="absolute right-0 cursor-pointer" >
                    <svg height="20px" viewBox="0 0 512 512" width="20px">
                      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                    </svg>
                  </div>
                  <p className='text-3xl Gentium-B-font my-5'>Detail</p>
                </div>
                {/* Body */}
                {/* Book card */}
                <div className="w-full bg-white drop-shadow-xl rounded p-5 relative mb-10">
                  {/* Card Header */}
                  <div className="w-full text-2xl">
                    {/* Borrow Date */}
                    <div className="w-full flex relative">
                      <div className="flex">
                        <div className="w-[150px] Gentium-B-font">
                          <p>Borrow Date</p>
                        </div>
                        <div className="">
                          <p>{b_date}</p>
                        </div>
                      </div>
                      <div className="hidden lg:block lg:absolute right-0">
                        <p>Total : {books.map(item => item.quantity).reduce((a, b) => a + b)} ea</p>
                      </div>
                    </div>
                    <div className="w-full lg:flex relative mb-10">
                      <div className="flex">
                        <div className="w-[150px] Gentium-B-font">
                          <p>Due Date</p>
                        </div>
                        <div className="">
                          <p>{d_date}</p>
                        </div>
                      </div>
                      <div className="lg:hidden">
                        <p>Total : {books.map(item => item.quantity).reduce((a, b) => a + b)} ea</p>
                      </div>
                      {late ?
                        <>
                          <div className="lg:absolute right-0">
                            <p>You are lated! <u className="text-red-500 cursor-pointer ml-3">Pay a fine</u></p>
                          </div>
                        </>
                        :
                        null
                      }
                    </div>
                  </div>
                  {books.map((books, index) =>
                    <>
                      <div className="w-full sm:h-auto bg-white drop-shadow min-[450px]:flex mt-3 p-0">
                        <div className="w-auto">
                          <img src={require('../../local_image/think_python.png')} className="min-[450px]:w-[180px] min-[450px]:h-[220px] cursor-pointer" alt='book' />
                        </div>
                        <div className="min-[450px]:w-full p-5">
                          <p className="text-xl min-[450px]:text-2xl line-clamp-2">{books.title}</p>
                          <b className="text-lg min-[450px]:text-xl">x{books.quantity}</b>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* update status button */}
                {status != 'Success' ?
                  <>
                    <div className="flex gap-5 mt-5">
                      {/* confirm button */}
                      <div onClick={() => {
                        setIsActiveModal(false)
                        setConfirmModal(true)
                        setConfirmState("Confirm")
                      }} className='rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
                        <div className="text-xl">
                          <p className='text-white'>Confirm</p>
                        </div>
                      </div>
                      {/* cancel button */}
                      <div onClick={() => {
                        setIsActiveModal(false)
                        setConfirmModal(true)
                        setConfirmState("Cancel")
                      }} className='rounded cursor-pointer w-[150px] h-[50px] bg-[#ff4d55] hover:bg-[#e0484f] flex justify-center items-center'>
                        <div className="text-xl">
                          <p className='text-white'>Cancel</p>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  null
                }
              </div>
            </div>
          </div>
        </>
        : null}
      <div className="w-full pt-[6em] px-[1em]">
        <div className='absolute cursor-pointer lg:hidden left-[3%]'>
          <GiHamburgerMenu size={30} onClick={() => { toggleslide() }} />
        </div>
        <table className='w-[768px] md:w-full text-center mt-5'>
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
              <tr className='h-[2.5em]' style={{ backgroundColor: index % 2 == 0 ? "#2F5D62" : "white", color: index % 2 == 0 ? 'white' : 'black' }}>
                <td>{item.borrowId}</td>
                <td>{item.borrower}</td>
                <td>{item.status}</td>
                <td className='Gentium-R-font'>
                  <div className='flex items-center justify-center'>
                    <AiOutlineSearch onClick={() => {
                      setIsActiveModal(true)
                      seeADetail(item)
                    }} size={30} className="cursor-pointer" />
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
