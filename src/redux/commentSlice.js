import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    comments : null,
    loading: false,
    error: false
}

export const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        fetchComments : (state) => {
            state.loading=true
        },
        commentsFetched : (state,action) => {
            state.comments = action.payload
            state.loading= false
        },
        commentsFailed: (state) => {
            state.loading=false
            state.error=true
        },
        addComment : (state,action) => {
            state.comments.push(action.payload)
        },
        deleteComment : (state,action) => {
            state.comments.splice(state.comments.map((comment) => (comment)).indexOf(action.payload),1)
        }

    }
})
export const { fetchComments,commentsFetched,commentsFailed,addComment,deleteComment} = commentSlice.actions
export default commentSlice.reducer