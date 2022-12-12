import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { GiHamburgerMenu } from 'react-icons/gi';
const BookStock = () => {
  const [books, setBooks] = useState([
    { title: 'Think Python', desc: "lorem ipsum mafak", lang: "Eng", type: "Computer", img: "", qty: 1 },
    { title: 'Think Java', desc: "lorem ipsum mafak", lang: "Eng", type: "Computer", img: "", qty: 1 },
    { title: 'Think Milk', desc: "lorem ipsum mafak", lang: "Eng", type: "Dessert", img: "", qty: 1 },
    { title: 'Think Jon Puad Hua', desc: "lorem ipsum mafak", lang: "Eng", type: "Shit Content", img: "", qty: 1 },
  ])
  const [selectedBook, setSelectedBook] = useState("")
  const [isActiveModal, setIsActiveModal] = useState(false)

  //----------------------New Book----------------------//
  const [bookTitle, setBookTitle] = useState("")
  const [bookLanguage, setBookLanguage] = useState("")
  const [bookType, setBookType] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [desc, setDesc] = useState("")
  const [chooseImage, setImage] = useState("")
  //----------------------New Book----------------------//

  //----------------------Edit Book----------------------//
  const [e_bookTitle, sete_BookTitle] = useState("")
  const [e_bookLanguage, sete_BookLanguage] = useState("")
  const [e_bookType, sete_BookType] = useState("")
  const [e_quantity, sete_Quantity] = useState(1)
  const [e_desc, sete_Desc] = useState("")
  const [e_chooseImage, sete_Image] = useState("")
  //----------------------Edit Book----------------------//

  const handleBookTitle = (event) => {
    setBookTitle(event.target.value);
  };
  const handleBookLanguage = (event) => {
    setBookLanguage(event.target.value);
  };
  const handleBookType = (event) => {
    setBookType(event.target.value);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.files[0].name)
  }
  const handleQuantity = (event) => {
    setQuantity(event.target.value)
  }

  const handleE_BookTitle = (event) => {
    sete_BookTitle(event.target.value);
  };
  const handleE_BookLanguage = (event) => {
    sete_BookLanguage(event.target.value);
  };
  const handleE_BookType = (event) => {
    sete_BookType(event.target.value);
  };
  const handleE_Desc = (event) => {
    sete_Desc(event.target.value);
  };
  const handleE_Image = (event) => {
    sete_Image(event.target.files[0].name)
  }
  const handleE_Quantity = (event) => {
    sete_Quantity(event.target.value)
  }
  const addBook = () => {
    const copyBooks = [...books]
    copyBooks.push({ title: bookTitle, lang: bookLanguage, type: bookType, img: chooseImage, qty: quantity })
    setBooks(copyBooks)
    setBookTitle("")
    setBookLanguage("")
    setBookType("")
    setImage("")
    setQuantity(1)
    setIsActiveModal(false)
    console.log(copyBooks)
  }
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
  return (
    <div>
      {isActiveModal ?
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded w-[768px] items-center justify-center slide-down-fade">
              <div className='text-3xl border-b-[1px] border-gray-300 relative'>
                <div onClick={() => { setIsActiveModal(false) }} className="absolute right-0 cursor-pointer" >
                  <svg height="20px" viewBox="0 0 512 512" width="20px">
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                  </svg>
                </div>
                <p className='mb-3'>Add New Book</p>
              </div>

              {/* Input field */}
              <div className="w-full mt-5">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Book Title :</p>
                  <TextField fullWidth label="" id="title" value={bookTitle} onChange={handleBookTitle} />
                </Box>
                <div className="w-full grid grid-cols-2 gap-3 mt-5">
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Language :</p>
                    <TextField fullWidth label="" id="lang" value={bookLanguage} onChange={handleBookLanguage} />
                  </Box>
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Book Type :</p>
                    <TextField fullWidth label="" id="booktype" value={bookType} onChange={handleBookType} />
                  </Box>
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Quantity :</p>
                    <TextField type={"number"} fullWidth label="" id="qty" value={quantity} onChange={handleQuantity} />
                  </Box>
                </div>
                <div className="w-full grid grid-cols-1 mt-5">
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Description :</p>
                    <TextField multiline rows={4} fullWidth label="" id="desc" value={desc} onChange={handleDesc} />
                  </Box>
                  <p className='text-xl mb-1 Gentium-B-font mt-5'>Choose An Image :</p>
                  <div className="w-full border-t-[1px] border-gray-300 mt-3">
                    <input className='mt-5' type={"file"} onChange={handleImage} />
                  </div>
                </div>
                {/* Button */}
                <div className="w-full grid grid-cols-2 gap-3 mt-10">
                  <div onClick={() => { setIsActiveModal(false) }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-full h-[50px] cursor-pointer'>
                    <p className='text-2xl'>Cancel</p>
                  </div>
                  <div onClick={() => { addBook() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-full h-[50px] cursor-pointer'>
                    <p className='text-2xl'>Add</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        null
      }
      <div className="w-full h-screen pt-[6em] px-10">
        <div className="flex relative w-full">
          <div className='absolute left-0 cursor-pointer lg:hidden'>
            <GiHamburgerMenu size={30} onClick={() => { toggleslide() }} />
          </div>
          <div onClick={() => { setIsActiveModal(true) }} className='absolute rounded cursor-pointer right-0 w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
            <div className="text-xl">
              <p className='text-white'>New</p>
            </div>
          </div>
        </div>
        <div className="w-full p-5 bg-white drop-shadow-xl mt-[5em] relative">
          <div className="hidden lg:flex lg:absolute right-[2%] relative flex">
            <div onClick={() => { }} className='mr-3 mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
              <p className='text-white text-xl'>Change</p>
            </div>
            <div onClick={() => { }} className='mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#bf1321] hover:bg-[#a8111d] flex justify-center items-center'>
              <p className='text-white text-xl'>Delete</p>
            </div>
          </div>
          <div className="w-full relative">
            <p className='text-3xl'>Choose A Book</p>
          </div>
          <div onClick={() => { }} className='lg:hidden mt-[1em] rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
            <div className="text-xl">
              <p className='text-white'>Change</p>
            </div>
          </div>
          <div onClick={() => { }} className='lg:hidden mt-[1em] rounded cursor-pointer w-[150px] h-[50px] bg-[#bf1321] hover:bg-[#a8111d] flex justify-center items-center'>
            <div className="text-xl">
              <p className='text-white'>Delete</p>
            </div>
          </div>
          <div className="mt-[2em] w-full">
            <Autocomplete
              className='w-full'
              disablePortal
              id="combo-box-books"
              options={books.map((item, index) => "(" + parseInt(index) + ") " + item.title + " x" + item.qty)}
              value={selectedBook}
              onChange={(event, newValue) => {
                const index = newValue.substring(1, 2)
                setSelectedBook(newValue);
                sete_BookTitle(books[index].title)
                sete_BookLanguage(books[index].lang)
                sete_BookType(books[index].type)
                sete_Quantity(books[index].qty)
                sete_Image(books[index].img)
                sete_Desc(books[index].desc)
                console.log(books[index].title)
              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </div>
          <div className="w-full lg:h-[550px] lg:grid grid-rows-3 grid-flow-col gap-5 mt-[3em]">
            <div className="w-full row-span-3">
              <img src={require('../../local_image/think_python.png')} className="w-[60%] h-auto cursor-pointer m-auto" alt='book' />
              <div className="w-full m-auto flex items-center justify-center">
                <input className='mt-5' type={"file"} onChange={handleE_Image} />
              </div>
            </div>
            <div className="w-full col-span-2 mt-[2em] md:mt-0">
              <div className="w-full grid grid-cols-1">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Book Title :</p>
                  <TextField fullWidth label="" id="title" value={e_bookTitle} onChange={handleE_BookTitle} />
                </Box>
              </div>
              <div className="w-full grid grid-cols-2 gap-5 mt-5">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Language :</p>
                  <TextField fullWidth label="" id="title" value={e_bookLanguage} onChange={handleE_BookLanguage} />
                </Box>
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Book Type :</p>
                  <TextField fullWidth label="" id="title" value={e_bookType} onChange={handleE_BookType} />
                </Box>
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Quantity :</p>
                  <TextField type={"number"} fullWidth label="" id="qty" value={e_quantity} onChange={handleE_Quantity} />
                </Box>
              </div>
              <div className="w-full grid grid-cols-1">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Description :</p>
                  <TextField multiline rows={4} fullWidth label="" id="desc" value={e_desc} onChange={handleE_Desc} />
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookStock