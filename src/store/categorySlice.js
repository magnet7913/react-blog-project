import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mappingCategoryData } from "../helpers"
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

export const fetchPostNewCategory = createAsyncThunk('category/postNew',
    async (obj, thunkAPI) => {
        const response = await categoryService.postNew(obj[0],obj[1])
        return response
    }
)

export const fetchDeleteCategory = createAsyncThunk('category/delete',
    async (obj, thunkAPI) => {
        const response = await categoryService.delete(obj[0],obj[1])
        return response
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
            state.categoryList = action.payload
        })
        .addCase(fetchPostNewCategory.rejected, (state,action) => {
            if (action.error.message === 'Request failed with status code 400') { state.error = "Có lỗi xảy ra" }
        })
        .addCase(fetchDeleteCategory.rejected, (state,action) => {
            if (action.error.message === 'Request failed with status code 400') { state.error = "Có lỗi xảy ra" }
        })
    }
})

const { actions, reducer } = categorySlice
export const { } = actions
export default reducer
