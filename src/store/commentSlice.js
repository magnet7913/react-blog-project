import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {    } from "../helpers"
import commentService from "../services/commentService";
const initialState = {
    commentList: []
}

export const fetchCommentList = createAsyncThunk('comment/fetchList',
    async (postId, thunkAPI) => {
        try {
            const response = await commentService.getComment(postId);
            const data = response.data
            return data
        } catch (err) {
        }
    })

const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentList.fulfilled, (state, action) => {
            state.commentList = action.payload
        })
    }
})

const {actions, reducer} = commentSlice
export const {} = actions
export default reducer
