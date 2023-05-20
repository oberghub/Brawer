import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useSelector } from 'react-redux';

const dns = "https://2igwz38ku9.execute-api.us-east-1.amazonaws.com/dev"
const BookingManage = () => {
  const user = useSelector((state) => state.user_data.user)
  const [myRoomHistory, setMyRoomHistory] = useState([])
  const [confirmModal, setConfirmModal] = useState(false)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [confirmState, setConfirmState] = useState("")

  const [bookingId, setBookingId] = useState()
  const [roomId, setRoomId] = useState()
  const [roomName, setRoomName] = useState()
  const [roomType, setRoomType] = useState()
  const [roomCapacity, setRoomCapacity] = useState()
  const [date, setDate] = useState()
  const [timeStart, setTimeStart] = useState()
  const [timeEnd, setTimeEnd] = useState()
  const [pricePerHour, setPricePerHour] = useState()
  const [equipments, setEquipments] = useState()
  const [bookingBy, setBookingBy] = useState()
  const [sumPrice, setSumPrice] = useState()
  const [status, setStatus] = useState()

  const seeADetail = (data) => {
    setBookingId(data.bookingId)
    setRoomId(data.roomId)
    setRoomName(data.roomName)
    setRoomType(data.roomType)
    setPricePerHour(data.pricePerHour)
    setRoomCapacity(data.roomCapacity)
    setDate(data.date)
    setTimeStart(data.timeStart)
    setTimeEnd(data.timeEnd)
    setEquipments(data.equipments)
    setBookingBy(data.bookingBy)
    setSumPrice(data.sumPrice)
    setStatus(data.status)
  }
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };
  const nodupe = (arr = [])=>{
    return arr.reduce((acc,item)=>{
      let index = acc.map(item => item.id).indexOf(item.id)
      if(index != -1){
        acc[index].qty++
      }else{
        acc.push({...item,qty:1})
      }
      return acc
    },[])
    
  }
  const changeStatus = () => {
    //กด PENDING สถานะจะเปลี่ยนเป็น APPROVED (จองแล้ว) เปลี่ยนสถานะpaymentที่ยกเลิกเป็น REFUND
    //กด CANCEL สถานะจะเปลี่ยนเป็น CANCEL //ลบรอบเวลาที่ยกเลิกออกจาก database
    console.log(confirmState)
    if(confirmState == "Confirm"){
      let updateReserve = {
        id:selectedDetail.bookingId,
        userId:selectedDetail.bookingBy,
        roomId:selectedDetail.roomId,
        equipmentsId:selectedDetail.equipments.map(e=>e.id),
        reserveFrom:selectedDetail.timeRent.date+" "+selectedDetail.timeRent.timeStart,
        reserveTo:selectedDetail.timeRent.date+" "+selectedDetail.timeRent.timeEnd,
        timestamp:selectedDetail.timestamp,
        status:"APPROVED",
      }
      console.log(updateReserve)
      axios.put(dns + "/reserve", JSON.stringify(updateReserve), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res.status + " " + res.statusText + " "+res.data)
        if(res.status === 200){
          console.log(myRoomHistory)
          selectedDetail.status = "APPROVED"
          setMyRoomHistory([...myRoomHistory.filter((e)=>e.bookingId!==selectedDetail.bookingId), selectedDetail])
        }
      })
    }else if(confirmState === "Cancel"){
      (async()=>{
        let payment = (await axios.get(dns + "/reserveById/"+selectedDetail.bookingId, {headers: {'Content-Type': 'application/json'}})).data
        payment.status = "REFUNDED"
        console.log(payment)
        axios.put(dns + "/payment", payment, {
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((res) => {
        console.log(res.status + " " + res.statusText + " "+res.data)
        if(res.status === 200){
          // selectedDetail.status = "CANCELLED"
          // setMyRoomHistory([...myRoomHistory.filter((e)=>e.bookingId!=selectedDetail.bookingId), selectedDetail])

        }})
      })()
      let updateReserve = {
        id:selectedDetail.bookingId,
        userId:selectedDetail.bookingBy,
        roomId:selectedDetail.roomId,
        equipmentsId:selectedDetail.equipments.map(e=>e.id),
        reserveFrom:selectedDetail.timeRent.date+" "+selectedDetail.timeRent.timeStart,
        reserveTo:selectedDetail.timeRent.date+" "+selectedDetail.timeRent.timeEnd,
        timestamp:selectedDetail.timestamp,
        status:"CANCELLED",
      }
      console.log(updateReserve)
      axios.put(dns + "/reserve", JSON.stringify(updateReserve), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res.status + " " + res.statusText + " "+res.data)
        if(res.status === 200){
          selectedDetail.status = "CANCELLED"
          setMyRoomHistory([...myRoomHistory.filter((e)=>e.bookingId!==selectedDetail.bookingId), selectedDetail])

        }
      })
      
     
      
    }
    setConfirmModal(false)
  }
  const [selectedDetail,setSelectDetail] = useState()
  useEffect( ()=>{
    (async()=>{
        let bookingList = []
        await axios.get(`${dns}/reserves`, {
        }).then(async (res) => {
            if(res.status === 200){
                for(let i=0;i<res.data.length;i++){
                    let equiments = []
                    let room = {}
                    
                    let requestEqui = res.data[i].equipmentsId

                    //ยังไม่เสร็จดี
                    // for(let i=0;i<requestEqui.length;i++){
                    //   equiments.push(await (await axios.get(`${dns}/equipment/${requestEqui[i]}`, {
                    //     headers: {
                    //       'Content-Type': 'application/json'
                    //     }
                    //   })).data)
                    // }
                    // equiments =  await (await axios.get(dns+"/equipment/?ids="+requestEqui.join(","), {})).data
                    room = await (await axios.get(dns + "/workspaces/"+res.data[i].roomId, {})).data
                    let sum = room.price*(parseInt(res.data[i].reserveTo.substring(11,19))-parseInt(res.data[i].reserveFrom.substring(11,19)))
                    let booking = {
                        bookingId: res.data[i].id,
                        roomId: res.data[i].roomId,
                        roomName: room.room_name,
                        roomType: room.room_type,
                        roomCapacity: room.room_capacity,
                        timeRent: { date: res.data[i].reserveFrom.substring(0,10), timeStart: res.data[i].reserveFrom.substring(11,19), timeEnd: res.data[i].reserveTo.substring(11,19) },
                        equipments: equiments,
                        bookingBy: res.data[i].userId,
                        status: res.data[i].status,
                        total:equiments.length !== 0 ? equiments.map(item => item.price * 1).reduce((a, b) => a+b) + sum : sum,
                        pricePerHour:room.price,
                        sumPrice:sum,
                        timestamp:res.data[i].timestamp
                    }
                    equiments = []
                    bookingList.push(booking)
                }
                
            }
        }).catch((e) => console.log(e))

        setMyRoomHistory(bookingList)
    })()  
},[user])
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
                    <div onClick={() => { changeStatus() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
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
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Workstation :</p>
                      <p className='absolute right-[3%]'>Room {selectedDetail.roomName}</p>
                    </div>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Capacity :</p>
                      <p className='absolute right-[3%]'>{selectedDetail.roomCapacity.length > 1?`${selectedDetail.roomCapacity[0]}-${selectedDetail.roomCapacity[1]}`:selectedDetail.roomCapacity[0]} Person</p>
                    </div>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Room Price :</p>
                      <p className='absolute right-[3%]'>{selectedDetail.pricePerHour} THB</p>
                    </div>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Date :</p>
                      <p className='absolute right-[3%]'>{selectedDetail.timeRent.date}</p>
                    </div>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Time :</p>
                      <p className='absolute right-[3%]'>{selectedDetail.timeRent.timeStart} - {selectedDetail.timeRent.timeEnd}</p>
                    </div>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>Period :</p>
                      <p className='absolute right-[3%]'>{parseInt(selectedDetail.timeRent.timeEnd) - parseInt(selectedDetail.timeRent.timeStart)} HRS</p>
                    </div>
                  </div>
                  <p className='text-xl sm:text-2xl Gentium-B-font my-[0.5em]'>Additional Equipments</p>
                  {nodupe(selectedDetail.equipments).length == 0 ?
                    <div className='indent-5'>
                      <p className='text-xl'>None</p>
                    </div>
                    :
                    <>
                      {nodupe(selectedDetail.equipments).map(item => <>
                        <div className='indent-5' key={item}>
                          <div className='w-full text-lg sm:text-xl flex relative'>
                            <p className='Gentium-B-font'>- {item.name}</p>
                            <p className='absolute right-[3%]'>x{item.qty} : {item.price * item.qty} THB</p>
                          </div>
                        </div>
                      </>)}
                    </>
                  }
                  <div className='w-full mt-[1em] flex p-5 text-xl sm:text-2xl border-t-[1px] border-gray-300 relative'>
                    <p className='Gentium-B-font'>Total</p>
                    <p className='absolute right-[3%]'>{nodupe(selectedDetail.equipments).length !== 0 ? nodupe(selectedDetail.equipments).map(item => item.price * item.qty).reduce((a, b) => a+b) + selectedDetail.sumPrice : selectedDetail.sumPrice} THB</p>
                  </div>
                </div>
                {/* update status button */}
                {selectedDetail.status != 'APPROVED' && selectedDetail.status != 'CANCELLED' && selectedDetail.status != 'TIMEOUT' ?
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
              <tr key={item} className='h-[2.5em]' style={{ backgroundColor: index % 2 === 0 ? "#2F5D62" : "white", color: index % 2 === 0 ? 'white' : 'black' }}>
                <td>{item.bookingId}</td>
                <td>{item.bookingBy}</td>
                <td className='Gentium-B-font' style={{color : item.status === 'CANCELLED' ? 'red' : index % 2 === 0 ? 'white' : 'black'}}>{item.status}</td>
                <td className='Gentium-R-font'>
                  <div className='flex items-center justify-center'>
                    <AiOutlineSearch size={30} className="cursor-pointer" onClick={() => {
                      setIsActiveModal(true)
                      // seeADetail(item)
                      console.log(item)
                      setSelectDetail(item)
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
