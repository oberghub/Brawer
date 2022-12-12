import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { AiOutlineSearch } from 'react-icons/ai'
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
  const [isActiveModal, setIsActiveModal] = useState(false)

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
  return (
    <div>
      {isActiveModal ?
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setIsActiveModal(false) }}>
            <div className="bg-white p-2 rounded flex items-center justify-center slide-down-fade">
              <div className="w-[320px] min-[768px]:w-[768px]">
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
              </div>
            </div>
          </div>
        </>
        : null}
      <div className="w-full pt-[6em] px-[1em]">
        {/* <div className="w-full bg-white drop-shadow-xl grid grid-cols-1">

          </div> */}
        <table className='w-[768px] md:w-full text-center'>
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
                <td>{item.status}</td>
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
