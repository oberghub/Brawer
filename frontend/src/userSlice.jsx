import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {
        _id:"",
        name:"",
        email:"",
        role:"",
        favouriteBooks:[],
        imageUrl:"https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png"
    },
    userloaded : false
}

export const userSlice = createSlice({
    name : 'user_data',
    initialState,
    reducers : {
        userdata : (state, action) => {
            state.user = action.payload
        },
        setLoaded : (state,action)=>{
            state.userloaded = action.payload
        }
    }
})

export const { userdata,setLoaded } = userSlice.actions
export default userSlice.reducer