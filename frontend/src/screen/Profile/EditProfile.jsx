import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const EditProfile = () => {
  const [displayName, setDisplayName] = useState("แกะนิรนาม")
  const [email, setEmail] = useState("anosheep@gmail.com")
  const [phone, setPhone] = useState("0985411233")
  const handleDisplayName = (event) => {
    setDisplayName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  return (
    <div>
      <div>
        <p className='text-3xl Gentium-B-font'>Edit Your Profile</p>
        <div className="w-full rounded grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFF] drop-shadow-xl p-5">
          <Box
            className='w-full'
          >
            <p className='text-xl mb-1 Gentium-B-font'>Display Name :</p>
            <TextField fullWidth label="" id="displayname" value={displayName} onChange={handleDisplayName} />
          </Box>
          <Box
            className='w-full'
          >
            <p className='text-xl mb-1 Gentium-B-font'>E-Mail :</p>
            <TextField fullWidth label="" id="displayname" value={email} onChange={handleEmail} />
          </Box>
          <Box
            className='w-full'
          >
            <p className='text-xl mb-1 Gentium-B-font'>Phone :</p>
            <TextField fullWidth label="" id="displayname" value={phone} onChange={handlePhone} />
          </Box>
        </div>
        <div className="sm:w-[20%] h-[50px] my-5 rounded bg-[#2F5D62] hover:bg-[#2B5155] flex items-center justify-center">
          <p className='text-2xl text-white'>Confirm</p>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
