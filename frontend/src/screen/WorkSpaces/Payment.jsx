import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCreditCard, AiOutlineBank, AiOutlineQrcode } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import secureLocalStorage from 'react-secure-storage';
const Payment = () => {
  const [resultRoom, setResultRoom] = useState(
    //ชุดทดสอบ ลบออกแล้วมัน error T_T
    {
      bookingId: 'booking001',
      roomId: 'wsw001',
      roomName: "w01",
      roomType: "Workstation",
      roomCapacity: "2 - 9",
      pricePerHour : 500,
      sumPrice : 1000,
      date: "2022-11-25",
      timeStart: "14:00",
      timeEnd: "16:00",
      equipments: [
        { itemName: "Microphone", price: 150, quantity: 2 },
        { itemName: "Projector", price: 250, quantity: 1 },
      ],
      bookingBy: "sheepSheepy",
      // status: "Cancel",
    },
  )
  const [paymentMethod, setMethod] = useState([
    { type: "Credit / Debit", icon: <AiOutlineCreditCard size={100} className="m-auto" /> },
    { type: "Bank Transfer", icon: <AiOutlineBank size={100} className="m-auto" /> },
    { type: "QR Code", icon: <AiOutlineQrcode size={100} className="m-auto" /> },
  ])
  const [selectPaymentMethod, setSelectPayment] = useState(null)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()
  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };
  const confirmPayment = () => {
    setIsActiveModal(false)
    setConfirmModal(true)
  }
  useEffect(() => {
    let room = JSON.parse(secureLocalStorage.getItem("myRoom"))
    if(!!room){
      setResultRoom(room)
      console.log(room)
    }
    else{
      navigate("/")
    }
  }, [])
  return (
    <div>
      {confirmModal ?
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setConfirmModal(false) }}>
            <div className="bg-white p-2 rounded w-72 h-72 flex items-center justify-center slide-down-fade">
              <div className="text-center">
                <BsCheckCircleFill size={100} color={'green'} className="m-auto" />
                <p className="text-4xl Gentium-B-font">Success</p>
                <p className="m-auto">Click to back to main menu</p>
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
            <div className="bg-white p-8 rounded flex justify-center slide-down-fade">
              <div className="">
                <div className='w-full border-b-[1px] border-gray-300'>
                  <p className='text-3xl Gentium-B-font mb-5'>Type To Confirm Payment</p>
                </div>
                <Box
                  className='my-8'
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <p className='text-xl mb-3'>Type <b>'OkBaeTonk'</b> to confirm a payment.</p>
                  <TextField fullWidth placeholder='OkBaeTonk' label="" id="typeToConfirm" value={confirmText} onChange={handleChange} />
                </Box>
                <div className='w-full flex items-center justify-center gap-3 mt-7'>
                  <div onClick={() => { setIsActiveModal(false) }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                    <p className='text-2xl'>Cancel</p>
                  </div>
                  {confirmText == "OkBaeTonk" ?
                    <div onClick={() => { confirmPayment() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                      <p className='text-2xl'>Confirm</p>
                    </div>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
        </>
        : null}
      <div className='lg:w-[1024px] p-5 m-auto'>
        <div>
          {/* <p className='text-3xl'>Result</p> */}
          <div className='w-full bg-[#FAFAFA] rounded p-5 drop-shadow-xl'>
            <p className='text-2xl sm:text-3xl Gentium-B-font mb-[0.5em]'>Room Seleted</p>
            <div className='indent-5'>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Workstation :</p>
                <p className='absolute right-[3%]'>Room {resultRoom.room_name}</p>
              </div>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Capacity :</p>
                <p className='absolute right-[3%]'>{resultRoom.room_capacity} Person</p>
              </div>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Room Price :</p>
                <p className='absolute right-[3%]'>{resultRoom.price} THB</p>
              </div>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Date :</p>
                <p className='absolute right-[3%]'>{resultRoom.date}</p>
              </div>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Time :</p>
                <p className='absolute right-[3%]'>{resultRoom.time_start} - {resultRoom.time_end}</p>
              </div>
              <div className='w-full text-xl sm:text-2xl flex relative'>
                <p className='Gentium-B-font'>Period :</p>
                <p className='absolute right-[3%]'>{parseInt(resultRoom.time_end) - parseInt(resultRoom.time_start)} HRS</p>
              </div>
            </div>
            <p className='text-2xl sm:text-3xl Gentium-B-font my-[0.5em]'>Additional Equipments</p>
            {resultRoom.equipments.length == 0 ?
              <div className='indent-5'>
                <p className='text-xl sm:text-2xl'>None</p>
              </div>
              :
              <>
                {resultRoom.equipments.map(item => <>
                  <div className='indent-5'>
                    <div className='w-full text-xl sm:text-2xl flex relative'>
                      <p className='Gentium-B-font'>- {item.itemName}</p>
                      <p className='absolute right-[3%]'>x{item.quantity} : {item.price * item.quantity} THB</p>
                    </div>
                  </div>
                </>)}
              </>
            }
            <div className='w-full mt-[1em] flex p-5 text-xl sm:text-3xl border-t-[1px] border-gray-300 relative'>
              <p className='Gentium-B-font'>Total</p>
              <p className='absolute right-[3%]'>{resultRoom.equipments.length !== 0 ? resultRoom.equipments.map(item => item.price * item.quantity).reduce((a, b) => a+b) + resultRoom.sumPrice : resultRoom.sumPrice} THB</p>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:w-[1024px] m-auto p-5'>
        <div>
          <div className='bg-[#FAFAFA] drop-shadow-xl p-5'>
            <div className='border-b-[1px] border-gray-300'>
              <p className='text-2xl sm:text-3xl Gentium-B-font mb-[0.5em]'>Choose Payment Method</p>
            </div>
            <div className='flex gap-5 overflow-x-scroll'>
              {paymentMethod.map((item, index) =>
                <>
                  {index == selectPaymentMethod ?
                    <div onClick={() => { setSelectPayment(index) }} className='w-[150px] sm:h-[150px] text-center cursor-pointer bg-gray-200 my-5 p-3 rounded drop-shadow-xl'>
                      {item.icon}
                      <p className='text-xl'>{item.type}</p>
                    </div>
                    :
                    <div onClick={() => { setSelectPayment(index) }} className='w-[150px] sm:h-[150px] text-center cursor-pointer bg-gray-100 my-5 p-3 rounded drop-shadow-xl'>
                      {item.icon}
                      <p className='text-xl'>{item.type}</p>
                    </div>
                  }
                </>
              )}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center p-3 min-[400px]:p-0 mt-5 relative'>
        <div className="w-full min-[400px]:w-[400px] bg-gray-200 h-2 mb-6 flex">
          <div className="bg-[#2F5D62] h-2 progress-bar-slide-full" />
        </div>
      </div>
      <div className='w-full flex items-center justify-center gap-3 my-7'>
        <div onClick={() => { navigate('/booking/equipments') }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
          <p className='text-2xl'>Back</p>
        </div>
        {selectPaymentMethod == null ?
          <div className='rounded bg-[#E5E5E5] opacity-50 flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-default'>
            <p className='text-2xl'>Confirm</p>
          </div>
          :
          <div onClick={() => { setIsActiveModal(true) }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
            <p className='text-2xl'>Confirm</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Payment
