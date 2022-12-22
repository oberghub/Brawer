import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
const BookingHistory = () => {
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
            bookingBy: "sheepSheepy",
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
            bookingBy: "sheepSheepy",
            status: "Pending"
        }
    ]
    )
    const user = useSelector((state) => state.user_data.user)
    const [selectDetail, setSelectDetail] = useState(null)
    const seeDetail = (index) => {
        if (selectDetail == index) {
            setSelectDetail(null)
        }
        else {
            setSelectDetail(index)
        }
    }
    const nodupe = (arr = [])=>{
        return arr.reduce((acc,item)=>{
          let index = acc.map(item => item._id).indexOf(item._id)
          if(index != -1){
            acc[index].qty++
          }else{
            acc.push({...item,qty:1})
          }
          return acc
        },[])
        
    }
    useEffect( ()=>{
        (async()=>{
            let bookingList = []
            await axios.get("http://localhost:8082/reserve-service/reserve/user/"+user._id, {
            }).then(async (res) => {
                if(res.status == 200){
                    for(let i=0;i<res.data.length;i++){
                        let equiments = []
                        let room = {}
                        
                        let requestEqui = res.data[i].equipmentsId
                        equiments =  await (await axios.get("http://localhost:8082/equipment-service/equipment/ids/"+requestEqui.join(","), {})).data
                        room = await (await axios.get("http://localhost:8082/workspace-service/workspace/"+res.data[i].roomId, {})).data
                        let sum = room.price*(parseInt(res.data[i].reserveTo.substring(11,19))-parseInt(res.data[i].reserveFrom.substring(11,19)))
                        let booking = {
                            bookingId: res.data[i]._id,
                            roomId: res.data[i].roomId,
                            roomName: room.room_name,
                            roomType: room.room_type,
                            roomCapacity: room.room_capacity,
                            timeRent: { date: res.data[i].reserveFrom.substring(0,10), timeStart: res.data[i].reserveFrom.substring(11,19), timeEnd: res.data[i].reserveTo.substring(11,19) },
                            additionalItem: equiments,
                            bookingBy: res.data[i].userId,
                            status: res.data[i].status,
                            total:nodupe(equiments).length !== 0 ? nodupe(equiments).map(item => item.price * item.qty).reduce((a, b) => a+b) + sum : sum
                        }
                        bookingList.push(booking)
                    }
                    
                }
            }).catch((e) => console.log(e))

            setMyRoomHistory(bookingList)
        })()
        
       
    },[user])
    return (
        <div>
            <p className='text-3xl Gentium-B-font mb-5'>Booking History</p>
            <div className="w-full grid grid-cols-1 gap-5">
                {myRoomHistory.map((item, index) =>
                    <>
                        <div key={item.bookingId} onClick={() => { seeDetail(index) }} className="w-full cursor-pointer bg-[#FAFAFA] p-3 sm:p-5 rounded drop-shadow-xl">
                            <div className='border-b-[1px] border-gray-300 flex relative'>
                                <p className='text-2xl sm:text-3xl Gentium-B-font mb-3'>ID : {item.bookingId}</p>
                                <p className='text-xl sm:text-2xl absolute Gentium-B-font right-0 mb-3' style={{ color: item.status == "APPROVED" ? "green" : item.status == "PENDING" ? "blue" : "red" }}>{item.status}</p>
                            </div>
                            {selectDetail == index ?
                                <div>
                                    {/* <p className='text-3xl'>Result</p> */}
                                    <div className='w-full bg-[#FAFAFA] rounded p-5 drop-shadow-xl'>
                                        <p className='text-xl sm:text-2xl sm:text-2xl Gentium-B-font mb-[0.5em]'>Room Seleted</p>
                                        <div className='indent-5'>
                                            <div className='w-full text-lg sm:text-xl flex relative'>
                                                <p className='Gentium-B-font'>Workstation :</p>
                                                <p className='absolute right-[3%]'>Room {item.roomName}</p>
                                            </div>
                                            <div className='w-full text-lg sm:text-xl flex relative'>
                                                <p className='Gentium-B-font'>Capacity :</p>
                                                <p className='absolute right-[3%]'>{item.roomCapacity.length > 1?`${item.roomCapacity[0]}-${item.roomCapacity[1]}`:item.roomCapacity[0]} Person</p>
                                            </div>
                                            <div className='w-full text-lg sm:text-xl flex relative'>
                                                <p className='Gentium-B-font'>Date :</p>
                                                <p className='absolute right-[3%]'>{item.timeRent.date}</p>
                                            </div>
                                            <div className='w-full text-lg sm:text-xl flex relative'>
                                                <p className='Gentium-B-font'>Start :</p>
                                                <p className='absolute right-[3%]'>{item.timeRent.timeStart}</p>
                                            </div>
                                            <div className='w-full text-lg sm:text-xl flex relative'>
                                                <p className='Gentium-B-font'>End :</p>
                                                <p className='absolute right-[3%]'>{item.timeRent.timeEnd}</p>
                                            </div>
                                        </div>
                                        <p className='text-xl sm:text-2xl Gentium-B-font my-[0.5em]'>Additional Equipments</p>
                                        {nodupe(item.additionalItem).length == 0 ?
                                            <div className='indent-5'>
                                                <p className='text-xl'>None</p>
                                            </div>
                                            :
                                            <>
                                                {nodupe(item.additionalItem).map(item => <>
                                                    <div className='indent-5'>
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
                                            <p className='absolute right-[3%]'>{item.total} THB</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="mt-[1em]">
                                    <p className='text-xl text-gray-300'>Click to see detail.</p>
                                </div>
                            }

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BookingHistory
