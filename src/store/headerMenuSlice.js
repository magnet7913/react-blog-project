import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {mappingCategoryData} from "../helpers";
import headerMenuService from "../services/headerMenuService";
import { trimResult } from "../helpers";
const initialState = {
    header: []
}

export const fetchHeaderMenu = createAsyncThunk('headerMenu/fetchList',
    async (params, thunkAPI) => {
        try {
            const response = await headerMenuService.getAll();
            const data = trimResult(response.data.items,['title','child_items'])
            return data
        } catch (err) {
        }
    })

    
const headerMenuSlice = createSlice({
    name:'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHeaderMenu.fulfilled, (state, action) => {
            state.header = action.payload
        })
    }
})

const {actions, reducer} = headerMenuSlice
export const {} = actions
export default reducer
