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
    const timeRange = [
        { label : '09:00'},
        { label : '10:00'},
        { label : '11:00'},
        { label : '12:00'},
        { label : '13:00'},
        { label : '14:00'},
        { label : '15:00'},
        { label : '16:00'},
    ]
    const timeRangeFilter = timeStart == null ? timeRange : timeRange.filter(item => item.label > timeStart.label)
    return (
        <div>
            <div className='min-[1440px]:w-[1440px] m-auto'>
                <div className='w-full sm:h-[100px] border-b-[1px] border-gray-300 mt-[5em] p-10 text-center'>
                    <p className='text-3xl Gentium-B-font'>Find Available Room</p>
                </div>
                <div className='w-full md:h-[100px] md:flex md:gap-7 justify-center p-10'>
                    <p className='text-2xl mb-3 md:mb-0' onClick={() => { console.log(!date.$d ? date : date.$d)
                                                            console.log(timeStart) }}>Select a time</p>
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
                        options={timeRange}
                        value={timeStart}
                        onChange={(event, newValue) => {
                          setTimeStart(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Time Start" />}
                    />
                    <Autocomplete
                        className='md:w-[260px]'
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
                </div>
            </div>
        </div>
    )
}

export default FindARoom
