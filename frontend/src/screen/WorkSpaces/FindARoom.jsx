import React, { useState} from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
function FindARoom() {
    const navigate = useNavigate()
    let currentTime = new Date().toISOString().slice(0, 10)
    const [date, setDate] = useState(currentTime)
    const [time_start, setTimeStart] = useState(null)
    const [time_end, setTimeEnd] = useState(null)
    const [isFiltered, setFiltered] = useState(false)
    const [allRooms, setRooms] = useState([
        {
            _id: 'wsw001',
            room_name: "w01",
            room_type: "Workstation",
            room_capacity: "2 - 9",
            price : 500,
            time_rent: [
                { date: "2022-12-10", time_start: "12:00", time_end: "14:00" },
                { date: "2022-12-10", time_start: "14:00", time_end: "15:00" },
                { date: "2022-12-10", time_start: "18:00", time_end: "19:00" },
                { date: "2022-12-11", time_start: "14:00", time_end: "16:00" }
            ],
            desc:"room big big"
        },
        {
            _id: 'wsw002',
            room_name: "w02",
            room_type: "Workstation",
            room_capacity: "2 - 9",
            price : 500,
            time_rent: [
                { date: "2022-12-10", time_start: "10:00", time_end: "15:00" },
                { date: "2022-12-12", time_start: "11:00", time_end: "19:00" },
            ],
            desc:"big big room"
        }
    ]
    )
    const [selectedRoomType, setSelectedRoomType] = useState(null)
    const [filterRooms, setFilterRooms] = useState(allRooms)
    const room_type = [
        "Workstation", "Meeting Room", "Seminar Room"
    ]
    const timeRange = [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
    ]
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomIndex, setRoomIndex] = useState(0)
    const forTimeStart = timeRange.filter(item => item <= "20:00")
    const timeRangeFilter = time_start == null ? timeRange : timeRange.filter(item => item > time_start)

    //function หาห้องที่ยังว่าง
    function findAvailableRooms(rooms, date = "2022-12-10", time_start, time_end) {
        function findRooms(allrooms){
            let roomsT = allrooms.filter(item => item.room_type == selectedRoomType)
            let datebase = new Date();
            if (date.constructor.name == "M") {
                datebase = date.toDate().toISOString().slice(0, 10)
            } else {
                datebase = new Date(date).toISOString().slice(0, 10)
            }

            let start = new Date(datebase + "T" + time_start)
            let end = new Date(datebase + "T" + time_end)
            const availableRooms = [];
            for (const room of roomsT) {
                let occupied = false
                for (const time of room.time_rent) {

                    let roombase = new Date(time.date).toISOString().slice(0, 10)
                    let roomstart = new Date(roombase + "T" + time.time_start)
                    let roomend = new Date(roombase + "T" + time.time_end)
                    console.log(roomstart, roomend)
                    if (roombase == datebase) {
                        if ((start >= roomstart && start < roomend) || (end > roomstart && end <= roomend)) {
                            occupied = true
                            console.log(room, roomstart, roomend)
                        }
                        if (start < roomend && end > roomstart) {
                            occupied = true
                            console.log(room, roomstart, roomend)
                        }
                    }
                }
                if (!occupied) {
                    availableRooms.push(room);
                }
            }
            console.log(availableRooms)
            setFilterRooms(availableRooms)
            setFiltered(true)
            setSelectedRoom(allRooms[0])
        }
        axios.get("http://localhost:8082/workspace-service/workspaces/all", {
        }).then((res) => {
          setRooms(res.data)
          let myrooms = res.data
          findRooms(myrooms)
          
        }).catch((e) => {findRooms(rooms);console.log(e)})
        
    }
    //ตอนกด next หลังเลือกห้อง
    const storeTimeRent = () => {
        let datebase;
        if (date.constructor.name == "M") {
            datebase = date.toDate().toISOString().slice(0, 10)
        }else{
            datebase = date
        }
        let data = { ...selectedRoom, date : datebase, time_start : time_start, time_end : time_end, equipments : [], sumPrice : selectedRoom.price * (parseInt(time_end) - parseInt(time_start))}
        secureLocalStorage.setItem("myRoom", JSON.stringify(data))
    }

    //ตอนกดปุ่ม Cancel
    const cancelReserve = () => {
        secureLocalStorage.removeItem("myRoom")
    }

    //get ข้อมูลจาก secureLocalStorage
    useEffect(() => {
        let room = JSON.parse(secureLocalStorage.getItem("myRoom"))
        if(!!room){
            setDate(room.date)
            setTimeStart(room.time_start)
            setTimeEnd(room.time_end)
            setSelectedRoomType(room.room_type)
        }
        else{
            setDate(currentTime)
            setTimeStart(null)
            setTimeEnd(null)
            setSelectedRoomType(null)
        }
    }, [])
    useEffect(() => {
        axios.get("http://localhost:8082/workspace-service/workspaces/all", {
        }).then((res) => {
          setRooms(res.data)
        }).catch((e) => console.log(e))
      }, [])
    return (
        <div>
            <div className='w-full md:h-[100px] md:flex md:gap-7 justify-center p-10'>
                <p className='text-2xl mb-3 md:mb-0' onClick={() => {
                    console.log(!date.$d ? date : date.$d.toString().substring(4, 15))
                    console.log(time_start)
                }}>Select a time</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        minDate={currentTime}
                        className='w-full md:w-[260px]'
                        label="Date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Autocomplete
                    className='my-3 md:my-0 md:w-[260px]'
                    disablePortal
                    id="combo-box-time_start"
                    options={forTimeStart}
                    value={time_start}
                    onChange={(event, newValue) => {
                        setTimeStart(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Time Start" />}
                />
                <Autocomplete
                    className='my-3 md:my-0 md:w-[260px]'
                    disablePortal
                    id="combo-box-time_end"
                    options={timeRangeFilter}
                    disabled={time_start == null ? true : false}
                    value={time_end}
                    onChange={(event, newValue) => {
                        setTimeEnd(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Time End" />}
                />
                <Autocomplete
                    className='my-3 md:my-0 md:w-[260px]'
                    id="combo-box-room_type"
                    options={room_type}
                    value={selectedRoomType}
                    onChange={(event, newValue) => {
                        setSelectedRoomType(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Room Type" />}
                />
                {time_start !== null && time_end !== null && selectedRoomType !== null ?
                    <div className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center md:w-[150px] h-[50px] cursor-pointer' onClick={() => { findAvailableRooms(allRooms, date, time_start, time_end) }}>
                        <p className='text-2xl'>Find</p>
                    </div>
                    :
                    null
                }
            </div>
            <div className='w-full p-5'>
                {filterRooms.length !== 0 ?
                    null
                    :
                    <div className='w-full text-center my-5'>
                        <p className='Gentium-B-font text-3xl'>Not found a room, We are apologize;-;.</p>
                    </div>
                }
                {isFiltered && filterRooms.length != 0 ?
                    <div className='w-full mt-3 m-auto text-center'>
                        <p className='text-3xl'>Available Rooms</p>
                    </div>
                    :
                    null
                }
                {filterRooms.map((data, index) => <>
                    {isFiltered ?
                        <div onClick={() => {
                            setRoomIndex(index)
                            setSelectedRoom(data)
                            console.log(data)
                        }} className='cursor-pointer flex items-center rounded my-3 min-[1280px]:w-[980px] h-[120px] drop-shadow-xl m-auto p-4 relative' 
                            style={{backgroundColor : index === roomIndex ? '#F1F1F1' : 'white'}}>
                            <div>
                                <p className='text-2xl'>{data.room_type} : Room {data.room_name}</p>
                                <p className='text-xl'>Capacity : {data.room_capacity.length > 1?`${data.room_capacity[0]}-${data.room_capacity[1]}`:data.room_capacity[0]} Person</p>
                            </div>
                            <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center absolute right-[3%]'>
                                {index === roomIndex ?
                                    <div className='w-5 h-5 rounded-full bg-green-400' />
                                    :
                                    null
                                }
                            </div>
                        </div>
                        :
                        null
                    }
                </>)}
            </div>
            {filterRooms.length !== 0 ?
                <>
                    <div className='w-full flex justify-center mt-5 relative'>
                        <div className="w-[400px] bg-gray-200 h-2 mb-6 flex">
                            <div className="bg-[#2F5D62] h-2 w-[0%] relative" />
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center gap-3 my-3'>
                        <div onClick={() => { navigate('/all-spaces')
                                              cancelReserve() }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                            <p className='text-2xl'>Cancel</p>
                        </div>
                        {isFiltered ?
                            <div onClick={() => { navigate('/booking/equipments')
                                                  storeTimeRent() }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                                <p className='text-2xl'>Next</p>
                            </div>
                            :
                            <div className='opacity-50 cursor-default rounded bg-[#E5E5E5] flex items-center justify-center w-[100px] md:w-[150px] h-[50px]'>
                                <p className='text-2xl'>Next</p>
                            </div>
                        }
                    </div>
                </>
                :
                null
            }
        </div>
    )
}

export default FindARoom
