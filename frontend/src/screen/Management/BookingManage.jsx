import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const BookingManage = () => {
  const [myRoomHistory, setMyRoomHistory] = useState([
    {
      bookingId: 'booking001',
      roomId: 'wsw001',
      roomName: "w01",
      roomType: "Workstation",
      roomCapacity: "2 - 9",
      timeRent: { date: "2022-11-25", timeStart: "14:00", timeEnd: "16:00" },
      additionalItem: [
        { itemName: "Microphone", price: 150, quantity: 2 },
        { itemName: "Projector", price: 250, quantity: 1 },
      ],
      bookingBy: "sheepSheepy",
      status: "Cancel",
    },
    {
      bookingId: 'booking002',
      roomId: 'wsw001',
      roomName: "w01",
      roomType: "Workstation",
      roomCapacity: "2 - 9",
      timeRent: { date: "2022-12-07", timeStart: "17:00", timeEnd: "19:00" },
      additionalItem: [
        { itemName: "Microphone", price: 150, quantity: 2 },
        { itemName: "Projector", price: 250, quantity: 1 },
      ],
      bookingBy: "zibirian",
      status: "Approved"
    },
    {
      bookingId: 'booking003',
      roomId: 'wsw001',
      roomName: "w01",
      roomType: "Workstation",
      roomCapacity: "2 - 9",
      timeRent: { date: "2022-12-08", timeStart: "11:00", timeEnd: "13:00" },
      additionalItem: [
        { itemName: "Microphone", price: 150, quantity: 2 },
        { itemName: "Projector", price: 250, quantity: 1 },
      ],
      bookingBy: "eggcrumble",
      status: "Pending"
    },
    {
      bookingId: 'booking004',
      roomId: 'smr001',
      roomName: "sr1",
      roomType: "Seminar Room",
      roomCapacity: "50-100",
      timeRent: { date: "2022-12-17", timeStart: "11:00", timeEnd: "17:00" },
      additionalItem: [
        { itemName: "Microphone", price: 150, quantity: 10 },
        { itemName: "Projector", price: 250, quantity: 2 },
      ],
      bookingBy: "dannylee",
      status: "Pending"
    }
  ]
  )
  const [confirmModal, setConfirmModal] = useState(false)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [confirmState, setConfirmState] = useState("")

  const [bookingId, setBookingId] = useState()
  const [roomId, setRoomId] = useState()
  const [roomName, setRoomName] = useState()
  const [roomType, setRoomType] = useState()
  const [roomCapacity, setRoomCapacity] = useState()
  const [timeRent, setTimeRent] = useState()
  const [additionalItem, setAdditionalItem] = useState()
  const [bookingBy, setBookingBy] = useState()
  const [status, setStatus] = useState()
  const seeADetail = (data) => {
    setBookingId(data.bookingId)
    setRoomId(data.roomId)
    setRoomName(data.roomName)
    setRoomType(data.roomType)
    setRoomCapacity(data.roomCapacity)
    setTimeRent(data.timeRent)
    setAdditionalItem(data.additionalItem)
    setBookingBy(data.bookingBy)
    setStatus(data.status)
  }
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
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
                <div className='w-full bg-[#FAFAFA] rounded p-5 drop-shadow-xl'>
                  <p className='text-xl sm:text-2xl sm:text-2xl Gentium-B-font mb-[0.5em]'>Room Seleted</p>
                  <div className='indent-5'>
                    <div className='w-full text-lg sm:text-xl flex relative'>
                      <p className='Gentium-B-font'>Workstation :</p>
                      <p className='absolute right-[3%]'>Room {roomName}</p>
                    </div>
                    <div className='w-full text-lg sm:text-xl flex relative'>
                      <p className='Gentium-B-font'>Capacity :</p>
                      <p className='absolute right-[3%]'>{roomCapacity} Person</p>
                    </div>
                    <div className='w-full text-lg sm:text-xl flex relative'>
                      <p className='Gentium-B-font'>Date :</p>
                      <p className='absolute right-[3%]'>{timeRent.date}</p>
                    </div>
                    <div className='w-full text-lg sm:text-xl flex relative'>
                      <p className='Gentium-B-font'>Start :</p>
                      <p className='absolute right-[3%]'>{timeRent.timeStart}</p>
                    </div>
                    <div className='w-full text-lg sm:text-xl flex relative'>
                      <p className='Gentium-B-font'>End :</p>
                      <p className='absolute right-[3%]'>{timeRent.timeEnd}</p>
                    </div>
                  </div>
                  <p className='text-xl sm:text-2xl Gentium-B-font my-[0.5em]'>Additional Equipments</p>
                  {additionalItem.length == 0 ?
                    <div className='indent-5'>
                      <p className='text-xl'>None</p>
                    </div>
                    :
                    <>
                      {additionalItem.map(item => <>
                        <div className='indent-5'>
                          <div className='w-full text-lg sm:text-xl flex relative'>
                            <p className='Gentium-B-font'>- {item.itemName}</p>
                            <p className='absolute right-[3%]'>x{item.quantity} : {item.price * item.quantity} THB</p>
                          </div>
                        </div>
                      </>)}
                    </>
                  }
                  <div className='w-full mt-[1em] flex p-5 text-xl sm:text-2xl border-t-[1px] border-gray-300 relative'>
                    <p className='Gentium-B-font'>Total</p>
                    <p className='absolute right-[3%]'>1550 THB</p>
                  </div>
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
        <div className='absolute left-[3%] cursor-pointer lg:hidden'>
          <GiHamburgerMenu size={30} onClick={() => { toggleslide() }} />
        </div>
        <table className='w-[768px] md:w-full text-center mt-5'>
          <thead className='h-[60px]'>
            <tr className='text-2xl Gentium-B-font'>
              <th>Booking Id</th>
              <th>Booking By</th>
              <th>Status</th>
              <th>See Detail</th>
            </tr>
          </thead>
          <tbody className='text-xl'>
            {myRoomHistory.map((item, index) =>
              <tr className='h-[2.5em]' style={{ backgroundColor: index % 2 == 0 ? "#2F5D62" : "white", color: index % 2 == 0 ? 'white' : 'black' }}>
                <td>{item.bookingId}</td>
                <td>{item.bookingBy}</td>
                <td className='Gentium-B-font'>{item.status}</td>
                <td className='Gentium-R-font'>
                  <div className='flex items-center justify-center'>
                    <AiOutlineSearch size={30} className="cursor-pointer" onClick={() => {
                      setIsActiveModal(true)
                      seeADetail(item)
                    }} />
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

export default BookingManage
