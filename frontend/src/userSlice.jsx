import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
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