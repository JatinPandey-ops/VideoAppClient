import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentChannel : null,
    loading: false,
    error: false
}

export const channelSlice = createSlice({
    name : "channel",
    initialState,
    reducers : {
        fetchChannel : (state) => {
            state.loading= true
        },
        channelfetched : (state,action) => {
            state.loading= false
            state.currentChannel= action.payload
        },
        fetchfail : (state) => {
            state.loading= false
            state.error= true
        }

    }
})

export const { fetchChannel,channelfetched,fetchfail} = channelSlice.actions
export default channelSlice.reducer