import React, { useState } from 'react'
import { Link, useLocation, Outlet } from "react-router-dom";
const MainManage = () => {
  const selected = useLocation()
  const [menu, setMenu] = useState([
    { title: "Book Stock", link: 'book-stock' },
    { title: "Equipments Stock", link: 'equipments-stock' },
    { title: "Workspace Manage", link: 'workspace-manage' },
    { title: "Borrow Manage", link: 'borrow-manage' },
    { title: "Booking Manage", link: 'booking-manage' }
  ])
  const toggleslide = () => {
    document.getElementById('menu-slide-toggle').classList.toggle('invisible')
    document.getElementById('menu-slide-toggle').classList.toggle('translate-x-[-100%]');
  }
  return (
    <div>
      <div className="w-[100%] flex">
        {/* Menu ตอนจอใหญ่อยู่ */}
      <div className="hidden lg:block w-[370px] h-screen bg-[#FCFCFC] drop-shadow-xl pt-[6em] pl-5">
          <p className='text-3xl Gentium-B-font'>Management</p>
          <div className="indent-5 mt-[2em]">
            {menu.map((item, index) => <>
              <div>
                {selected.pathname.substring(12) == item.link ?
                  <p className='text-2xl my-4 cursor-default text-gray-300'>- <Link to={item.link}>{item.title}</Link></p>
                  :
                  <p className='text-2xl my-4 cursor-pointer'>- <Link to={item.link}>{item.title}</Link></p>
                }
              </div>
            </>)}
          </div>
        </div>
        {/* sm menu */}
        <div id="menu-slide-toggle" className="z-30 duration-300 ease-out transition-all translate-x-[-100%] invisible lg:hidden fixed left-0 md:block w-[320px] h-screen bg-[#FCFCFC] drop-shadow-xl pt-[6em] pl-5">
          <div onClick={() => toggleslide()} className="absolute right-[5%] cursor-pointer" >
            <svg height="20px" viewBox="0 0 512 512" width="20px">
              <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
            </svg>
          </div>
          <p className='text-3xl Gentium-B-font'>Management</p>
          <div className="indent-5 mt-[2em]">
            {menu.map((item, index) => <>
              <div>
                {selected.pathname.substring(12) == item.link ?
                  <p className='text-2xl my-4 cursor-default text-gray-300'>- <Link to={item.link}>{item.title}</Link></p>
                  :
                  <p className='text-2xl my-4 cursor-pointer'>- <Link to={item.link}>{item.title}</Link></p>
                }
              </div>
            </>)}
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainManage
