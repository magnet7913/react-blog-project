import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {mappingCategoryData} from "../helpers"
import categoryService from "../services/categoryService";
const initialState = {
    categoryList: []
}

export const fetchCategoryList = createAsyncThunk('category/fetchList',
    async (params, thunkAPI) => {
        try {
            const response = await categoryService.getAll();
            const data = mappingCategoryData(response.data)
            return data
        } catch (err) {
        }
    })

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
            state.categoryList = action.payload
        })
    }
})

const {actions, reducer} = categorySlice
export const {} = actions
export default reducer
