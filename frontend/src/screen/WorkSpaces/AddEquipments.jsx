import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AddEquipments = () => {
    const navigate = useNavigate()
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [equipments, setEquipments] = useState([
        { itemName: "Projector", price: 300 },
        { itemName: "Laptop", price: 500 },
        { itemName: "Charging Adapter", price: 50 },
        { itemName: "Microphone", price: 100 },
        { itemName: "Upgrade Speaker", price: 250 },
    ])
    const [added, setAdded] = useState([
    ])
    const incrementQuantity = (ind) => {
        setAdded(added.map((item, index) => {
            if (index == ind) {
                return { ...item, quantity: item.quantity + 1 }
            }
            else {
                return item
            }
        }))
        // console.log(BookData[index])
    }
    const decrementQuantity = (ind) => {
        setAdded(added.map((item, index) => {
            if (index == ind) {
                if (item.quantity === 1) {
                    return { ...item, quantity: 1 }
                }
                return { ...item, quantity: item.quantity - 1 }
            }
            else {
                return item
            }
        }))
    }
    const delItem = (data, index) => {
        //คืนของเข้า modal
        let copyEquipments = [...equipments]
        copyEquipments.push({ itemName: data.itemName, price: data.price })
        setEquipments(copyEquipments)

        //ลบของออกจากหน้าหลัก
        let copyAddedItem = [...added]
        copyAddedItem.splice(index, 1)
        setAdded(copyAddedItem)
    }
    const addItem = (data, index) => {
        //add ของเข้าไปใน added
        let copyAddedItem = [...added]
        copyAddedItem.push({ itemName: data.itemName, price: data.price, quantity: 1 })
        setAdded(copyAddedItem)

        //ลบของออกจาก modal
        let copyEquipments = [...equipments]
        copyEquipments.splice(index, 1)
        setEquipments(copyEquipments)
    }
    return (
        <div>
            {isActiveModal ?
                <>
                    <div className="w-full md:w-auto absolute top:0 md:fixed md:inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => { setIsActiveModal(false) }}>
                        <div className="w-full md:w-auto slide-down-fade bg-white p-10 rounded flex items-center justify-center">
                            <div className="w-full md:w-auto h-[650px]">
                                {/* พอเลือกของแล้ว ของใน modal จะหายไป ถ้าลบของ ของจะกลับมาอยู่ใน modal อีกครั้ง */}
                                <div className='flex relative'>
                                    <p className='text-2xl sm:text-3xl'>Click to choose an item</p>
                                    <p className='text-3xl absolute right-[2%] cursor-pointer'>X</p>
                                </div>
                                {equipments.map((item, index) =>
                                    <>
                                        <div key={index} onClick={() => { addItem(item, index) }} className='bg-[#FAFAFA] drop-shadow md:w-[500px] md:h-[100px] p-5 my-5 cursor-pointer'>
                                            <p className='text-2xl'>{item.itemName}</p>
                                            <p className='text-xl'>{item.price} THB / 1 Pcs.</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
                : null}
            <div className='w-full mt-[3em] m-auto text-center'>
                <p className='text-3xl'>Select Equipments</p>
            </div>
            <div className='min-[1280px]:w-[1280px] h-[500px] p-5 mt-[2em] m-auto bg-[#FAFAFA] relative overflow-y-scroll'>
                {added.map((item, index) => <>
                    <div className='my-3 p-5 min-[480px]:flex items-center min-[1280px]:w-[980px] h-[100px] bg-white rounded drop-shadow-xl m-auto relative'>
                        <p className='text-2xl'>{item.itemName}</p>
                        <div className='flex gap-5 absolute right-[3%]'>
                            <p className='text-2xl'>Qt.</p>
                            <p onClick={() => decrementQuantity(index)} className='text-3xl cursor-pointer'>-</p>
                            <p className='text-2xl'>{item.quantity}</p>
                            <p onClick={() => incrementQuantity(index)} className='text-3xl cursor-pointer'>+</p>
                            <p className='text-2xl'>{item.price * item.quantity}</p>
                            <p onClick={() => delItem(item, index)} className='text-4xl ml-[1em] cursor-pointer'>X</p>
                        </div>
                    </div>
                </>)}
                <div onClick={() => { setIsActiveModal(true) }} className='cursor-pointer mt-7 flex items-center justify-center min-[1280px]:w-[980px] h-[80px] bg-[#2F5D62] hover:bg-[#2B5155] rounded drop-shadow-xl m-auto'>
                    <p className='text-2xl text-white'>Click to add</p>
                </div>
            </div>
            <div className='w-full flex justify-center p-3 min-[400px]:p-0 mt-5 relative'>
                <div className="w-full min-[400px]:w-[400px] bg-gray-200 h-2 mb-6 flex">
                    <div className="bg-[#2F5D62] h-2 progress-bar-slide" />
                </div>
            </div>
            <div className='w-full flex items-center justify-center gap-3 my-3'>
                <div onClick={() => { navigate("/booking/find-a-room") }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                    <p className='text-2xl'>Back</p>
                </div>
                {added.length === 0 ?
                    <div onClick={() => { navigate("/booking/payment") }} className='rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                        <p className='text-2xl'>Skip</p>
                    </div>
                    :
                    <div onClick={() => { navigate("/booking/payment") }} className='rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer'>
                        <p className='text-2xl'>Next</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default AddEquipments