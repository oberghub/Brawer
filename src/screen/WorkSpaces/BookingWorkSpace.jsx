import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
function BookingWorkSpace() {
    //หลังจากเลือกวันและเวลา ห้องทั้งหมดที่สามารถจองได้จะแสดงผล เราสามารถเลือกได้ว่าจะเอาห้องไหน
    //selectedRoom จะเป็นตัวเก็บ index ที่เลือกเอาไว้เพื่อไปแสดงปุ่มเขียวๆด้านขวาของ Card ว่าเราเลือกห้องอะไร Default คือห้องบนสุด
    return (
        <>
            <div className='min-[1440px]:w-[1440px] m-auto pt-[3.5em] sm:pt-[5em]'>
                <div className='w-full sm:h-[100px] border-b-[1px] border-gray-300 p-10 text-center'>
                    <p className='text-3xl sm:text-4xl Gentium-B-font'>Reserve your room</p>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default BookingWorkSpace
