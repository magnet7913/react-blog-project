import { configureStore } from '@reduxjs/toolkit'
import articleReducers from "./articleSlice"
import categoryReducers from "../store/categorySlice"
import headerMenuReducers from "../store/headerMenuSlice"
import commentReducers from "../store/commentSlice"

const store = configureStore({
    reducer: {
        ARTICLE: articleReducers,
        CATEGORY: categoryReducers,
        HEADERMENU: headerMenuReducers,
        COMMENT: commentReducers,
    }
    
})

export default store