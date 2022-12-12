import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { GiHamburgerMenu } from 'react-icons/gi';
const EquipmentsStock = () => {
  const [equipments, setEquipments] = useState([
    { title: 'Projector', price : 100 , desc : "lorem ipsum fuck"},
    { title: 'White Board', price : 100, desc : "lorem ipsum fuck" },
    { title: 'Microphone', price : 100, desc : "lorem ipsum fuck"},
    { title: 'Shabu', price : 100, desc : "lorem ipsum fuck" },
  ])
  const [selectedEquipments, setSelectedEquipments] = useState("")
  const [isActiveModal, setIsActiveModal] = useState(false)

  //----------------------New Equipments----------------------//
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  //----------------------New Equipments----------------------//

  //----------------------Edit Equipments----------------------//
  const [e_Title, sete_Title] = useState("")
  const [e_Price, sete_Price] = useState("")
  const [e_desc, sete_Desc] = useState("")
  //----------------------Edit Equipments----------------------//

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleE_Title = (event) => {
    sete_Title(event.target.value);
  };
  const handleE_Price = (event) => {
    sete_Price(event.target.value);
  };
  const handleE_Desc = (event) => {
    sete_Desc(event.target.value);
  };
  const addEquipments= () => {
    const copyEquipments = [...equipments]
    copyEquipments.push({ title: title , price : price, desc : desc })
    setEquipments(copyEquipments)
    setTitle("")
    setPrice("")
    setIsActiveModal(false)
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
                <p className='mb-3'>Add New Equipments</p>
              </div>

              {/* Input field */}
              <div className="w-full mt-5">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Title :</p>
                  <TextField fullWidth label="" id="title" value={title} onChange={handleTitle} />
                </Box>
                <div className="w-full grid grid-cols-2 gap-3 mt-5">
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Price :</p>
                    <TextField type={"number"} fullWidth label="" id="price" value={price} onChange={handlePrice} />
                  </Box>
                </div>
                <div className="w-full grid grid-cols-1 mt-5">
                  <Box
                    className='w-full'
                  >
                    <p className='text-xl mb-1 Gentium-B-font'>Description :</p>
                    <TextField multiline rows={4} fullWidth label="" id="desc" value={desc} onChange={handleDesc} />
                  </Box>
                </div>
                {/* Button */}
                <div className="w-full grid grid-cols-2 gap-3 mt-10">
                  <div onClick={() => { setIsActiveModal(false) }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-full h-[50px] cursor-pointer'>
                    <p className='text-2xl'>Cancel</p>
                  </div>
                  <div onClick={() => { addEquipments() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-full h-[50px] cursor-pointer'>
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
            <p className='text-3xl'>Choose An Equipments</p>
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
              id="combo-box-equipments"
              options={equipments.map((item, index) => "(" + parseInt(index) + ") " + item.title)}
              value={selectedEquipments}
              onChange={(event, newValue) => {
                const index = newValue.substring(1, 2)
                setSelectedEquipments(newValue);
                sete_Title(equipments[index].title)
                sete_Price(equipments[index].price)
                sete_Desc(equipments[index].desc)
              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </div>
          <div className="w-full lg:h-[450px] lg:grid grid-rows-3 grid-flow-col gap-5 mt-[3em]">
            <div className="w-full col-span-2 mt-[2em] md:mt-0">
              <div className="w-full grid grid-cols-1">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Book Title :</p>
                  <TextField fullWidth label="" id="title" value={e_Title} onChange={handleE_Title} />
                </Box>
              </div>
              <div className="w-full grid grid-cols-2 gap-5 mt-5">
                <Box
                  className='w-full'
                >
                  <p className='text-xl mb-1 Gentium-B-font'>Price :</p>
                  <TextField fullWidth type={"number"} id="title" value={e_Price} onChange={handleE_Price} />
                </Box>
              </div>
              <div className="w-full grid grid-cols-1 mt-5">
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

export default EquipmentsStock
