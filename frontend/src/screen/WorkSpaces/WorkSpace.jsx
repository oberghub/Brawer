import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function WorkSpace() {
    const navigate = useNavigate()
    const [spaceData, setSpaceData] = useState([
        {
            title : 'Workstation',
            desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem unde quasi necessitatibus blanditiis pariatur laudantium quibusdam aperiam voluptate cumque sit reiciendis explicabo, dolores dolore earum possimus hic dignissimos minima beatae.',
            images : [
                "555",
                "555"
            ] 
        }
    ])
    return (
        <>
            <div className="w-full min-[1440px]:w-[1440px] m-auto overflow-x-hidden">
                {/* Hot Desk Container */}
                <div className='w-full flex relative down-scale'>
                    {/* Bg Image */}
                    <img src={require('../../local_image/hot-desk.jpg')} className="w-[1280px] h-[450px] xl:h-[550px]" />
                    {/* Card */}
                    <div className='absolute right-[1%] inset-y-[20%] w-[400px] h-[350px] bg-white drop-shadow p-8'>
                        <p className='Kanit-B-font text-3xl'>จอง Workspace ของคุณ</p>
                        <p className='Kanit-R-font indent-5 mt-3'>ในวันที่การทำงานไม่ได้จำกัดอยู่ที่โต๊ะออฟฟิศอีกต่อไป หลายคนที่รู้สึกเบื่อกับที่ทำงานเดิม ๆ ลองเปลี่ยนบรรยากาศมานั่งทำงานที่ Coworking space เหมาะกับทั้งสตาร์ทอัพ ฟรีแลนซ์ หรือคนที่อยากทำงานนอกบ้านอย่างทั่วถึง</p>
                        <div className='mt-3 Kanit-R-font'>
                            <p className='text-2xl Kanit-B-font'>มาที่นี่แล้วได้อะไรบ้าง?</p>
                            <li>เครื่องดืม เช่น ชา กาแฟ ฟรี !</li>
                            <li>อินเทอร์เน็ตความเร็วสูง</li>
                            <li>ใช้บริการเครื่องปริ้นท์ได้ไม่จำกัด</li>
                        </div>
                        <div onClick={() => {navigate('/booking/find-a-room')}} className="w-[300px] h-[65px] bg-[#2F5D62] hover:bg-[#2B5155] absolute bottom-[-10%] right-[11%] flex justify-center items-center cursor-pointer">
                            <p className='text-white text-xl Gentium-B-font' >Reserve Now!</p>
                        </div>
                    </div>
                </div>
                <div className='min-[1440px]:w-[1440px] flex my-[3em] overflow-x-scroll min-[1440px]:overflow-x-hidden overflow-y-hidden
                                scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                    <div className='flex w-[1440px] justify-center gap-8 my-[1em] min-[1440px]:my-[3em]'>
                        {/* Workstation */}
                        <div className='slide-in w-[400px] h-[400px] bg-white drop-shadow-2xl p-10 relative flex justify-center'>
                            <div>
                                <p className='text-4xl'>Workstation</p>
                                <p className='mt-3 indent-5'>เลือกรูปแบบสมาชิกและการใช้งานที่เหมาะสมกับคุณ เพื่อสร้างบรรยากาศการทำงานให้มีชีวิตชีวาในพื้นที่ Co-working Space สำหรับการทำงานแบบร่วมกัน</p>
                            </div>
                            <div className='w-[300px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] rounded m-auto flex items-center justify-center absolute bottom-[10%] cursor-pointer' onClick={() => {navigate('/space-info', {state : {title : "Workstation", desc : "eiei"}})}}>
                                <p className='text-xl text-white Gentium-B-font'>Learn More</p>
                            </div>
                        </div>
                        {/* Meeting Room */}
                        <div className='slide-in w-[400px] h-[400px] bg-white drop-shadow-2xl p-10 relative flex justify-center'>
                            <div>
                                <p className='text-4xl'>Meeting Room</p>
                                <p className='mt-3 indent-5'>ห้องประชุมส่วนตัวของคุณ มีสิ่งอำนวยความสะดวกสำหรับส่วนรวมอย่างครบครัน</p>
                            </div>
                            <div className='w-[300px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] rounded m-auto flex items-center justify-center absolute bottom-[10%] cursor-pointer' onClick={() => {navigate('/space-info', {state : {title : "Meeting Room", desc : "eiei"}})}}>
                                <p className='text-xl text-white Gentium-B-font'>Learn More</p>
                            </div>
                        </div>
                        {/* Seminar Room */}
                        <div className='slide-in w-[400px] h-[400px] bg-white drop-shadow-2xl p-10 relative flex justify-center'>
                            <div>
                                <p className='text-4xl'>Seminar Room</p>
                                <p className='mt-3 indent-5'>ห้องสัมมนาขนาดใหญ่ พร้อมทีมบริการและสิ่งอำนวยความสะดวกครบครัน</p>
                            </div>
                            <div className='w-[300px] h-[50px] bg-[#2F5D62] hover:bg-[#2B5155] rounded m-auto flex items-center justify-center absolute bottom-[10%] cursor-pointer' onClick={() => {navigate('/space-info', {state : {title : "Seminar Room", desc : "eiei"}})}}>
                                <p className='text-xl text-white Gentium-B-font'>Learn More</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkSpace

