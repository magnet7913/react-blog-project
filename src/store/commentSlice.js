import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { mappingCommentData } from "../helpers"
import commentService from "../services/commentService";
const initialState = {
    commentList: [],
    currentPage: 1,
    totalPages: 0,


    dataComment: {
        list: [],
        currentPage: 1,
        totalPages: 0
    },
    dataChildComments: {
        4: {
            list: [],
            currentPage: 1,
            totalPages: 0
        },
        7: {
            list: [],
            currentPage: 1,
            totalPages: 0
        },
    },
    excludeParent: [],
    excludeChild: []
}

export const fetchCommentList = createAsyncThunk('comment/fetchList',
    async (obj, thunkAPI) => {
        try {
            const {getState} = thunkAPI;
            const {COMMENT} = getState();
            const { excludeParent } = COMMENT;
            const response = await commentService.getComment(obj[0], obj[1], 0, excludeParent);
            const data = response.data.map(mappingCommentData)
            return {
                commentList: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"]),
                totalComments: parseInt(response.headers["x-wp-total"]),
                postID: obj[0]
            }
        } catch (err) {
        }
    })

export const fetchChildComment = createAsyncThunk('comment/fetchChild',
    async (obj, thunkAPI) => {
        try {
            const {getState} = thunkAPI;
            const {COMMENT} = getState();
            const { excludeChild } = COMMENT;
            const response = await commentService.getComment(obj[0], obj[1], obj[2], excludeChild);
            const data = response.data.map(mappingCommentData)
            return {
                // parent: obj[2],
                // data: {
                //     commentList: data,
                //     currentPage: obj[1],
                //     totalPages: parseInt(response.headers["x-wp-totalpages"]),
                // }
                commentList: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"]),
            }
        } catch (err) {
        }
    })

export const fetchPostComment = createAsyncThunk('comment/postComment',
    async (obj, thunkAPI) => {
        const response = await commentService.postComment(obj[0],obj[1])
        return mappingCommentData(response.data)
    }
)

export const fetchPostReply = createAsyncThunk('comment/postReply',
    async (obj, thunkAPI) => {
        const response = await commentService.postComment(obj[0],obj[1])
        return mappingCommentData(response.data)
    }
)

export 

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentList.fulfilled, (state, action) => {
            const payload = action.payload;

            return {
                ...state,
                ...payload,
                commentList: payload.currentPage === 1
                    ? [...payload.commentList]
                    : [...state.commentList, ...payload.commentList]
            };


            // state.commentList = action.payload.currentPage === 1
            //     ? [...action.payload.commentList]
            //     : [...state.commentList, ...action.payload.commentList];
            // state.currentPage = action.payload.currentPage;
            // state.totalPages = action.payload.totalPages
            // state.totalComments = action.payload.totalComments
            // state.postID = action.payload.postID


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

                // const payload = action.payload;
                // const parent = payload.parent

                // state.dataChildComments[parent] = {
                //     ...state.dataChildComments[]
                // }
            })
            .addCase(fetchPostComment.fulfilled, (state, action) => {
                state.commentList = [
                    action.payload,
                    ...state.commentList
                ]
                state.excludeParent = [...state.excludeParent, action.payload.id];
            })
            .addCase(fetchPostReply.fulfilled, (state,action) => {
                let index = state.commentList.findIndex(obj => obj.id === action.payload.parent)
                state.commentList[index].childComment = [action.payload,...state.commentList[index].childComment, ]
                state.excludeChild = [...state.excludeChild, action.payload.id];
            })
    }
})

const { actions, reducer } = commentSlice
export const { } = actions
export default reducer
