import { configureStore } from '@reduxjs/toolkit'
import articleReducers from "./articleSlice"
import categoryReducers from "../store/categorySlice"
import headerMenuReducers from "../store/headerMenuSlice"
import commentReducers from "../store/commentSlice"
import loginAndRegisterReducers from "../store/loginAndRegisterSlice"

const store = configureStore({
    reducer: {
        ARTICLE: articleReducers,
        CATEGORY: categoryReducers,
        HEADERMENU: headerMenuReducers,
        COMMENT: commentReducers,
        LOGIN: loginAndRegisterReducers,
    }
    
})

export default store