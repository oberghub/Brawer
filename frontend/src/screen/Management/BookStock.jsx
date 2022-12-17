import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
const BookStock = () => {
  const [books, setBooks] = useState([])
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
  const [selectedBook, setSelectedBook] = useState(null)
  const [isActiveModal, setIsActiveModal] = useState(false)

  //----------------------New Book----------------------//
  const [bookTitle, setBookTitle] = useState("")
  const [bookLanguage, setBookLanguage] = useState("")
  const [bookType, setBookType] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [desc, setDesc] = useState("")
  const [chooseImage, setImage] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [authors, setAuthors] = useState("")
  //----------------------New Book----------------------//

  //----------------------Edit Book----------------------//
  const [e_bookTitle, sete_BookTitle] = useState("")
  const [e_bookLanguage, sete_BookLanguage] = useState("")
  const [e_bookType, sete_BookType] = useState("")
  const [e_quantity, sete_Quantity] = useState(1)
  const [e_desc, sete_Desc] = useState("")
  const [e_chooseImage, sete_Image] = useState("")
  const [e_Authors, sete_Authors] = useState("")
  const [e_id, sete_Id] = useState("")
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
  // Handle change in selection box
  useEffect(() => {
    if(selectedBook){
      sete_Id(selectedBook._id)
      sete_BookTitle(selectedBook.title)
      sete_BookLanguage(selectedBook.language)
      sete_BookType(selectedBook.genres.join(","))
      sete_Authors(selectedBook.authors.join(","))
      sete_Quantity(selectedBook.quantity)
      sete_Desc(selectedBook.desc)
      // sete_Image(selectedBook.image)
      setImageUrls([selectedBook.image])
    }
    
  }, [selectedBook]);

  
  //---Handle Image---//
  const handleImage = (event) => {
    setImage([...event.target.files])
  }
  // useEffect(() => {
  //   if (chooseImage.length < 1) return;
  //   const newImageUrls = [];
  //   chooseImage.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
  //   setImageUrls(newImageUrls);
  // }, [chooseImage]);
  //---Handle Image---//
  
  const handleQuantity = (event) => {
    setQuantity(event.target.value)
  }
  const handleAuthors = (event) => {
    setAuthors(event.target.value)
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
    sete_Image(event.target.files[0])
    let myimage;
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () =>{
      myimage = reader.result
      setImageUrls([myimage])
    }
  }
  const handleE_Quantity = (event) => {
    sete_Quantity(event.target.value)
  }
  const handleE_Authors = (event) => {
    sete_Authors(event.target.value)
  }

  //เพิ่ม  Book
  const addBook = () => {
    const addThatBook = (image) =>{
      let addData = JSON.stringify({ title: bookTitle, language: bookLanguage, genres: bookType.split(","), image: image, quantity: quantity, authors: authors.split(","), desc: desc })
      axios.post("http://localhost:8082/book-service/books", addData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => console.log(res.status + " " + res.statusText))
      const copyBooks = [...books]
      copyBooks.push({ title: bookTitle, language: bookLanguage, genres: bookType.split(","), image: image, quantity: quantity, authors: authors.split(","), desc: desc })
      setBooks(copyBooks)
      setSelectedBook(copyBooks[0])
      setBookTitle("")
      setBookLanguage("")
      setBookType("")
      setImage("")
      setAuthors("")
      setDesc("")
      setQuantity(1)
      setIsActiveModal(false)
    }
    let myimage;
    let reader = new FileReader()
    if(chooseImage[0]){
      reader.readAsDataURL(chooseImage[0])
      reader.onload = () =>{
        myimage = reader.result
        addThatBook(myimage)
      }
    }else{
      addThatBook("none")
    }
  }

  //Update Book
  const updateBook = () => {
    selectedBook.title = e_bookTitle
    selectedBook.quantity = parseInt(e_quantity)
    selectedBook.language = e_bookLanguage
    selectedBook.image = imageUrls
    selectedBook.genres = e_bookType.split(",")
    selectedBook.desc = e_desc
    selectedBook.authors = e_Authors.split(",")


    //Update SelectedBook to db
    let updateData = JSON.stringify({_id:selectedBook._id,title: e_bookTitle, language: e_bookLanguage, genres: e_bookType.split(","), image: imageUrls[0], quantity: parseInt(e_quantity), authors: e_Authors.split(","), desc: e_desc })
    console.log(updateData)
    axios.put("http://localhost:8082/book-service/books", updateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => console.log(res.status + " " + res.statusText))

  }
  //Delete Book
  const deleteBook = () => {
    //Delete with selectedBook._id   in db
    let deleteData = "http://localhost:8082/book-service/books/"+selectedBook._id
    console.log(deleteData)
    // axios.delete("http://localhost:8082/book-service/books/"+deleteData, {
    // }).then((res) => console.log(res.status + " " + res.statusText))


    let todelete = books.filter((e)=>e._id != selectedBook._id)
    setBooks(todelete)
    setSelectedBook(todelete[0])
  }


  //Get Data When First Time Render
  useEffect(() => {
    axios.get("http://localhost:8082/book-service/books/all", {
    }).then((res) => {
      setBooks(res.data)
      setSelectedBook(res.data[0])
      console.log(res)
    }).catch((e) => console.log(e))
  }, [])
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
                <p onClick={() => { console.log(imageUrls) }} className='mb-3'>Add New Book</p>
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
                    <p className='text-xl mb-1 Gentium-B-font'>Genres :</p>
                    <TextField placeholder='ex. Science, Computer' fullWidth label="" id="booktype" value={bookType} onChange={handleBookType} />
                  </Box>
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Quantity :</p>
                    <TextField type={"number"} fullWidth label="" id="qty" value={quantity} onChange={handleQuantity} />
                  </Box>
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Authors :</p>
                    <TextField placeholder='ex. Somsri, Chaiyan' fullWidth label="" id="qty" value={authors} onChange={handleAuthors} />
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
                  {bookTitle !== "" && bookLanguage !== "" && bookType !== "" && quantity !== "" && authors !== "" && desc !== "" && chooseImage !== "" ?
                    <div onClick={() => { addBook() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-full h-[50px] cursor-pointer'>
                      <p className='text-2xl'>Add</p>
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
            <div onClick={() => { updateBook()}} className='mr-3 mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
              <p className='text-white text-xl'>Change</p>
            </div>
            <div onClick={() => { deleteBook()}} className='mt-[1em] lg:mt-0 rounded cursor-pointer w-[150px] h-[50px] bg-[#bf1321] hover:bg-[#a8111d] flex justify-center items-center'>
              <p className='text-white text-xl'>Delete</p>
            </div>
          </div>
          <div className="w-full relative">
            <p onClick={() => { console.log(e_chooseImage) }} className='text-3xl'>Choose A Book</p>
          </div>
          <div onClick={() => { updateBook()}} className='lg:hidden mt-[1em] rounded cursor-pointer w-[150px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center'>
            <div className="text-xl">
              <p className='text-white'>Change</p>
            </div>
          </div>
          <div onClick={() => { deleteBook()}} className='lg:hidden mt-[1em] rounded cursor-pointer w-[150px] h-[50px] bg-[#bf1321] hover:bg-[#a8111d] flex justify-center items-center'>
            <div className="text-xl">
              <p className='text-white'>Delete</p>
            </div>
          </div>
          <div className="mt-[2em] w-full">
            <Autocomplete
              className='w-full'
              disablePortal
              id="combo-box-books"
              options={books}
              // renderOption={(props,option)=>{
              //   return(<li {...props} key={option._id}>
              //     {"(" + books.findIndex((e)=>e._id==option._id) + ") " + option.title + " x" + option.quantity}
              //   </li>)
              // }}
              getOptionLabel={(option,index)=>"(" + books.findIndex((e)=>e._id==option._id) + ") " + option.title + " x" + option.quantity}
              value={selectedBook}
              onChange={(event, newValue) => {
                setSelectedBook(newValue);
                // const index = newValue.substring(1, 2)
                // sete_BookTitle(books[index].title)
                // sete_BookLanguage(books[index].language)
                // sete_BookType(books[index].genres.join(","))
                // sete_Authors(books[index].authors.join(","))
                // sete_Quantity(books[index].quantity)
                // sete_Image(books[index].image)
                // sete_Desc(books[index].desc)
                // console.log(books[index].title)
                // setImageUrls([books[index].image])

              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </div>
          <div className="w-full lg:h-[550px] lg:grid grid-rows-3 grid-flow-col gap-5 mt-[3em]">
            <div className="w-full row-span-3">
              {imageUrls.map(item => 
                <img src={item} className="w-[60%] h-auto cursor-pointer m-auto" alt='book_image' />
              )}
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
                  <p className='text-xl mb-1 Gentium-B-font'>Genres :</p>
                  <TextField placeholder='ex. Science, Computer' fullWidth label="" id="title" value={e_bookType} onChange={handleE_BookType} />
                </Box>
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Quantity :</p>
                  <TextField type={"number"} fullWidth label="" id="qty" value={e_quantity} onChange={handleE_Quantity} />
                </Box>
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Authors :</p>
                  <TextField placeholder='ex. Somsri, Chaiyan' fullWidth label="" id="qty" value={e_Authors} onChange={handleE_Authors} />
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
