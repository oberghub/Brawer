import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
function FindARoom() {
    let currentTime = new Date()
    const [date, setDate] = useState(currentTime)
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)
    const [allRooms, setRooms] = useState([
        {
            roomId: 'wsw001',
            roomName: "w01",
            roomType: "Workstation",
            roomCapacity: "2 - 9",
            timeRent: [
                { date: "Dec 10 2022", timeStart: "12:00", timeEnd: "14:00" },
                { date: "Dec 10 2022", timeStart: "14:00", timeEnd: "15:00" },
                { date: "Dec 10 2022", timeStart: "18:00", timeEnd: "19:00" }
            ]
        },
        // {
        //     roomId: 'wsw002',
        //     roomName: "w02",
        //     roomType: "Workstation",
        //     roomCapacity: "2 - 9",
        //     timeRent: [
        //         { date: "Dec 10 2022", timeStart: "10:00", timeEnd: "15:00" },
        //         { date: "Dec 12 2022", timeStart: "11:00", timeEnd: "19:00" },
        //         { date: "Dec 13 2022", timeStart: "10:00", timeEnd: "13:00" }
        //     ]
        // }
    ]
    )
    const [hasfiltered, setFilterState] = useState(false)
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
    const forTimeStart = timeRange.filter(item => item.label <= "20:00")
    const timeRangeFilter = timeStart == null ? timeRange : timeRange.filter(item => item.label > timeStart.label)
    const findARoom = () => {
        //2ตัวนี้ทำไว้เช็คเฉยๆไม่มีไร
        let a = []
        let b = true;

        //select วันที่  date.$d -> $d เป็น property ของตอนที่เราลือกวันที่ที่ไม่ใช่ปัจจุบันมาตอน setValue ใน datepicker --วัน Default เป็นวันปัจจุบัน--
        let selectDate = !date.$d ? date.toString().substring(4, 15) : date.$d.toString().substring(4, 15)
        for (let i = 0; i < allRooms.length; i++) {
            for (let j = 0; j < allRooms[i].timeRent.length; j++) {

                let start = allRooms[i].timeRent[j].timeStart
                let end = allRooms[i].timeRent[j].timeEnd

                //ถ้าจองในวันที่มีคนจองจะเข้าเงื่อนไขนี้มาเช็ครอบจองว่าซ้ำกันมั้ย
                if (allRooms[i].timeRent[j].date == selectDate) {
                    // //ถ้าเวลาเริ่มจองมันคร่อมรอบของคนที่จองไว้ หมายถึง มีคนจอง 12-14 นาฬิกา เราเริ่มจอง 13 นาฬิกาคือไม่ได้
                    // if(timeStart.label >= start){
                    //     if(timeStart.label < end){
                    //         b = false
                    //         console.log("Hi")
                    //         break
                    //     }
                    // }
                    // //ถ้าเวลาเริ่มจองน้อยกว่ารอบที่มีคนจองไว้ เช่น จอง10โมง น้อยกว่ารอบ
                    // else if(timeStart.label <= start){
                    //     if(timeEnd.label >= start && timeEnd.label <= end){
                    //         b = false
                    //         console.log("Hello world")
                    //         break
                    //     }
                    // }
                }
            }
        }
        console.log(b)
        // console.log(allRooms.filter(room => {
        //     for(let i=0;i<room.timeRent.length;i++){
        //         if(room.timeRent[i].date == selectDate && (timeStart > room.timeRent[i].timeStart && timeEnd < room.timeRent[i].timeEnd)){
        //             return false
        //         }
        //         else{
        //             return true
        //         }
        //     }
        // }))
    }
    return (
        <div>
            <div className='min-[1440px]:w-[1440px] m-auto'>
                <div className='w-full sm:h-[100px] border-b-[1px] border-gray-300 mt-[5em] p-10 text-center'>
                    <p className='text-3xl Gentium-B-font'>Find Available Room</p>
                </div>
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
                        <div onClick={findARoom} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center md:w-[150px] h-[50px] cursor-pointer'>
                            <p className='text-2xl'>Find</p>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default FindARoom
