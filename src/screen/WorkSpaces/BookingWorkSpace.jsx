import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
function BookingWorkSpace() {
    // const findARoom = () => {
    //     //2ตัวนี้ทำไว้เช็คเฉยๆไม่มีไร
    //     let a = []
    //     let b = true;

    //     //select วันที่  date.$d -> $d เป็น property ของตอนที่เราลือกวันที่ที่ไม่ใช่ปัจจุบันมาตอน setValue ใน datepicker --วัน Default เป็นวันปัจจุบัน--
    //     let selectDate = !date.$d ? date.toString().substring(4, 15) : date.$d.toString().substring(4, 15)
    //     for (let i = 0; i < allRooms.length; i++) {
    //         for (let j = 0; j < allRooms[i].timeRent.length; j++) {

    //             let start = allRooms[i].timeRent[j].timeStart
    //             let end = allRooms[i].timeRent[j].timeEnd

    //             //ถ้าจองในวันที่มีคนจองจะเข้าเงื่อนไขนี้มาเช็ครอบจองว่าซ้ำกันมั้ย
    //             if (allRooms[i].timeRent[j].date == selectDate) {
    //                 // //ถ้าเวลาเริ่มจองมันคร่อมรอบของคนที่จองไว้ หมายถึง มีคนจอง 12-14 นาฬิกา เราเริ่มจอง 13 นาฬิกาคือไม่ได้
    //                 // if(timeStart.label >= start){
    //                 //     if(timeStart.label < end){
    //                 //         b = false
    //                 //         console.log("Hi")
    //                 //         break
    //                 //     }
    //                 // }
    //                 // //ถ้าเวลาเริ่มจองน้อยกว่ารอบที่มีคนจองไว้ เช่น จอง10โมง น้อยกว่ารอบ
    //                 // else if(timeStart.label <= start){
    //                 //     if(timeEnd.label >= start && timeEnd.label <= end){
    //                 //         b = false
    //                 //         console.log("Hello world")
    //                 //         break
    //                 //     }
    //                 // }
    //             }
    //         }
    //     }
    //     console.log(b)
    //     // console.log(allRooms.filter(room => {
    //     //     for(let i=0;i<room.timeRent.length;i++){
    //     //         if(room.timeRent[i].date == selectDate && (timeStart > room.timeRent[i].timeStart && timeEnd < room.timeRent[i].timeEnd)){
    //     //             return false
    //     //         }
    //     //         else{
    //     //             return true
    //     //         }
    //     //     }
    //     // }))
    // }
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
