import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom'
function FindARoom() {
    const navigate = useNavigate()
    let currentTime = new Date()
    const [date, setDate] = useState(currentTime)
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)
    const [isFiltered, setFiltered] = useState(false)
    const [allRooms, setRooms] = useState([
        {
            roomId: 'wsw001',
            roomName: "w01",
            roomType: "Workstation",
            roomCapacity: "2 - 9",
            timeRent: [
                { date: "2022-12-10", timeStart: "12:00", timeEnd: "14:00" },
                { date: "2022-12-10", timeStart: "14:00", timeEnd: "15:00" },
                { date: "2022-12-10", timeStart: "18:00", timeEnd: "19:00" },
                { date: "2022-12-11", timeStart: "14:00", timeEnd: "16:00" }
            ]
        },
        {
            roomId: 'wsw002',
            roomName: "w02",
            roomType: "Workstation",
            roomCapacity: "2 - 9",
            timeRent: [
                { date: "2022-12-10", timeStart: "10:00", timeEnd: "15:00" },
                { date: "2022-12-12", timeStart: "11:00", timeEnd: "19:00" },
            ]
        }
    ]
    )
    const [filterRooms, setFilterRooms] = useState(allRooms)
    const timeRange = [
        { label: '09:00' },
        { label: '10:00' },
        { label: '11:00' },
        { label: '12:00' },
        { label: '13:00' },
        { label: '14:00' },
        { label: '15:00' },
        { label: '16:00' },
        { label: '17:00' },
        { label: '18:00' },
        { label: '19:00' },
        { label: '20:00' },
        { label: '21:00' },
        { label: '22:00' },
    ]
    const [selectedRoom, setSelectedRoom] = useState(false);
    const forTimeStart = timeRange.filter(item => item.label <= "20:00")
    const timeRangeFilter = timeStart == null ? timeRange : timeRange.filter(item => item.label > timeStart.label)

    //วันไม่เหมือนกันแต่เวลาจองทับกันก็ไม่ออกมาให้ (Bug)
    function findAvailableRooms(rooms, date = "2022-12-10", timeStart, timeEnd) {
        let datebase = new Date();
        if (date.constructor.name == "M") {
            datebase = date.toDate().toISOString().slice(0, 10)
        } else {
            datebase = new Date(date).toISOString().slice(0, 10)
        }

        let start = new Date(datebase + "T" + timeStart.label)
        let end = new Date(datebase + "T" + timeEnd.label)
        const availableRooms = [];
        for (const room of rooms) {
            let occupied = false
            for (const time of room.timeRent) {

                let roombase = new Date(time.date).toISOString().slice(0, 10)
                let roomstart = new Date(roombase + "T" + time.timeStart)
                let roomend = new Date(roombase + "T" + time.timeEnd)
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
        return availableRooms;
    }

    return (
        <div>
            <div className='w-full md:h-[100px] md:flex md:gap-7 justify-center p-10'>
                <p className='text-2xl mb-3 md:mb-0' onClick={() => {
                    console.log(!date.$d ? date : date.$d.toString().substring(4, 15))
                    console.log(timeStart)
                }}>Select a time</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
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
                    id="combo-box-timeStart"
                    options={forTimeStart}
                    value={timeStart}
                    onChange={(event, newValue) => {
                        setTimeStart(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Time Start" />}
                />
                <Autocomplete
                    className='my-3 md:my-0 md:w-[260px]'
                    disablePortal
                    id="combo-box-timeEnd"
                    options={timeRangeFilter}
                    disabled={timeStart == null ? true : false}
                    value={timeEnd}
                    onChange={(event, newValue) => {
                        setTimeEnd(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Time End" />}
                />
                {timeStart !== null && timeEnd !== null ?
                    <div className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center md:w-[150px] h-[50px] cursor-pointer' onClick={() => { findAvailableRooms(allRooms, date, timeStart, timeEnd) }}>
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
                {isFiltered ?
                    <div className='w-full mt-3 m-auto text-center'>
                        <p className='text-3xl'>Available Rooms</p>
                    </div>
                    :
                    null
                }
                {filterRooms.map((data, index) => <>
                    {isFiltered ?
                        <div onClick={() => {
                            setSelectedRoom(index)
                        }} className='cursor-pointer flex items-center rounded my-3 min-[1280px]:w-[980px] h-[120px] drop-shadow-xl bg-white m-auto p-4 relative'>
                            <div>
                                <p className='text-2xl'>{data.roomType} : Room {data.roomName}</p>
                                <p className='text-xl'>Capacity : {data.roomCapacity} Person</p>
                            </div>
                            <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center absolute right-[3%]'>
                                {index == selectedRoom ?
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
                        <div onClick={() => { navigate('/all-spaces') }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                            <p className='text-2xl'>Cancel</p>
                        </div>
                        {isFiltered ?
                            <div onClick={() => { navigate('/booking/equipments') }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
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
