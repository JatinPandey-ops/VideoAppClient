import { createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentVideo :null,
    loading:false,
    error:false
}

export const videoSlice = createSlice({
    name:"video",
    initialState,
    reducers: {
            fetchVideo : (state) => {
              state.loading = true
            },
            videoFetched : (state) => {
              state.loading = false
            },
            fetchSuccess : (state,action) => {
                state.currentVideo = action.payload;
                state.error = false
                state.loading = false;
            },
            fetchFailure : (state) => {
               return initialState
            },
            like : (state,action) => {
                state.loading= false
                if(!state.currentVideo.likes.includes(action.payload)){
                    state.currentVideo.likes.push(action.payload);
                    state.currentVideo.dislikes.splice(
                        state.currentVideo.dislikes.findIndex(
                            (userId) => userId === action.payload
                            ),
                            1
                            )
                        }
            },
            dislike : (state,action) => {
                state.loading= false
                if(!state.currentVideo.dislikes.includes(action.payload)){
                    state.currentVideo.dislikes.push(action.payload);
                    state.currentVideo.likes.splice(
                        state.currentVideo.likes.findIndex(
                            (userId) => userId === action.payload
                            ),
                            1
                            )
                        }
            },
        
    }
})
export const {fetchVideo,videoFetched,fetchSuccess,fetchFailure ,like,dislike} = videoSlice.actions
export default videoSlice.reducer