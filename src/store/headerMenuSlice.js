import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mappingDataMenus } from "../helpers";
import headerMenuService from "../services/headerMenuService";
const initialState = {
    header: []
}


export const fetchHeaderMenu = createAsyncThunk('headerMenu/fetchList',
    async (params, thunkAPI) => {
        try {
            const response = await headerMenuService.getAll();
            // const data = trimResult(response.data.items,['title','child_items'])
            const data = response.data.items;
            const dataMapping = data.map(mappingDataMenus);
            return dataMapping
        } catch (err) {
        }
    })


const headerMenuSlice = createSlice({
    name: 'headerMenu',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHeaderMenu.fulfilled, (state, action) => {
            state.header = action.payload
        })
    }
})

const { actions, reducer } = headerMenuSlice
export const { } = actions
export default reducer
