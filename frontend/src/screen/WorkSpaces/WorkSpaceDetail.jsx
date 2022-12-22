import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function WorkSpaceDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const [imgData, setImgData] = useState([
    "https://www.incimages.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
    "https://d1tm14lrsghf7q.cloudfront.net/public/uploads/7NVgWmTWdDNFYHhIHGdhwMq7GvkGI4RypQn0LQbD.jpg",
    "https://knowledge-leader.colliers.com/wp-content/uploads/2019/09/194588533-KL-1024x680-1024x680.jpg"
  ])
  let [count, setCount] = useState(0)
  const nextImg = () => {
    if(count+1 != imgData.length){
      setCount(count+1)
    }
    else{
      console.log("???")
    }
  }
  const prevImg = () => {
    if(count-1 != -1){
      setCount(count-1)
    }
    else{
      console.log("???")
    }
  }
  return (
    <>
      <div className='min-[1440px]:w-[1440px] sm:gap-3 m-auto p-[1em] sm:flex xl:items-center justify-center'>
        <div className='xl:w-[500px] xl:h-[500px] mt-[3em] sm:mt-[5em] relative overflow-hidden'>
          <div className='flex justify-center relative'>
            {imgData.map((item, index) => <>
              {index == count ? 
                <img src={item} className="xl:w-[500px] xl:h-[500px] img-slide-in" />
              :
                null
              }
            </>)}
            <div className='flex gap-5 justify-center absolute bottom-[10px] inset-x-0'>
            {imgData.map((item, index) =><div onClick={() => {setCount(index)}} className='w-3 h-3 rounded-full bg-gray-200 cursor-pointer'/>)}
            </div>
          </div>
          {/* <div onClick={() => {prevImg()}} className='w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-gray-100 absolute  xl:top-[45%] left-3 cursor-pointer'>
            <p>-</p>
          </div>
          <div onClick={() => {nextImg()}} className='w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-gray-100 absolute xl:top-[45%] right-3 cursor-pointer'>
            <p>+</p>
          </div> */}
        </div>
        <div className='sm:w-[700px] sm:h-[500px] p-3 xl:p-10 sm:mt-[5em]'>
            <p className='text-4xl'>{location.state.title}</p>
            <p className='indent-5 text-xl mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos nulla nisi ut recusandae tempora at, assumenda quasi amet ullam quia ipsam nostrum voluptates corrupti maiores expedita! Velit repellat asperiores ipsam!</p>
            <div onClick={() => {navigate('/booking/find-a-room')}} className='w-[100%] h-[50px] mt-[3em] bg-[#2F5D62] hover:bg-[#2B5155] flex justify-center items-center cursor-pointer'>
                <p className='text-2xl text-white'>Reserve</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default WorkSpaceDetail
