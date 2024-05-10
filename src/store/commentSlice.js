import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mappingCommentData } from "../helpers"
import commentService from "../services/commentService";
const initialState = {
    commentList: [],
    currentPage: 1,
    totalPages: 0
}

export const fetchCommentList = createAsyncThunk('comment/fetchList',
    async (obj, thunkAPI) => {
        try {
            const response = await commentService.getComment(obj[0], obj[1], obj[2]);
            const data = response.data.map(mappingCommentData)
            return {
                commentList: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"]),
                totalComments: parseInt(response.headers["x-wp-total"]),
            }
        } catch (err) {
        }
    })

export const fetchChildComment = createAsyncThunk('comment/fetchChild',
    async (obj, thunkAPI) => {
        try {
            const response = await commentService.getComment(obj[0], obj[1], obj[2]);
            const data = response.data.map(mappingCommentData)
            return {
                commentList: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"]),
            }
        } catch (err) {
        }
    })

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentList.fulfilled, (state, action) => {
            state.commentList = action.payload.currentPage === 1
                ? [...action.payload.commentList]
                : [...state.commentList, ...action.payload.commentList];
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages
            state.totalComments = action.payload.totalComments
        })
            .addCase(fetchChildComment.fulfilled, (state, action) => {
                let index = state.commentList.findIndex(obj => obj.id === action.payload.commentList[0].parent)
                if (index !== -1) {
                    state.commentList[index].childComment = action.payload.currentPage === 1
                        ? [...action.payload.commentList]
                        : [...state.commentList[index].childComment, ...action.payload.commentList]
                    state.commentList[index].currentPage = action.payload.currentPage;
                    state.commentList[index].childTotalPages = action.payload.totalPages;
                }
            })
    }
})

const { actions, reducer } = commentSlice
export const { } = actions
export default reducer
