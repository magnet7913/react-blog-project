import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mappingUserData } from "../helpers"
import loginAndRegisterService from "../services/loginAndRegisterService";

const initialState = {
    isLogin: false,
    token: localStorage.getItem('token'),
    user: null,
    error: null,
}

export const loginFetch = createAsyncThunk('user/login',
    async (userCredentials, thunkAPI) => {
        {
            const {dispatch} = thunkAPI;
            const response = await loginAndRegisterService.getToken(userCredentials);
            const token = response.data.token
            localStorage.setItem('token', token)

            dispatch(currentUserFetch(token))
            return token;
        }
    })

export const logout = createAsyncThunk('user/logout',
    async (thunkAPI) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
)

export const registerFetch = createAsyncThunk('user/register',
    async (userCredentials, thunkAPI) => {
        {
            const response = await loginAndRegisterService.newRegister(userCredentials);
            const data = response.data
            localStorage.setItem('user', JSON.stringify(data))
            return data
        }
    })

export const currentUserFetch = createAsyncThunk('user/check',
    async (token, thunkAPI) => {
        const response = await loginAndRegisterService.currentUser(token);
        const data = mappingUserData(response.data)
        return data
    }
)

export const changePassword = createAsyncThunk('user/changePassword',
    async (obj, thunkAPI) => {
        const response = await loginAndRegisterService.changePassword(obj[0],obj[1])
        return response
})

export const fetchChangeUserDetail = createAsyncThunk('user/changeDetail',
    async (obj, thunkAPI) => {
        const response = await loginAndRegisterService.changeUserDetail(obj[0],obj[1])
        return response
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginFetch.pending, (state) => {
            state.isLogin = false
            state.token = null
            state.user = null
            state.error = null
            localStorage.setItem('isLogin', false)
        })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload.data
                state.error = null
                localStorage.setItem('isLogin', true)

            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.isLogin = false
                state.token = null
                state.user = null
                localStorage.setItem('isLogin', false)
                if (action.error.message === 'Request failed with status code 403') { state.error = "Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu!" }
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogin = false
                state.user = null
                state.error = null
                localStorage.setItem('isLogin', false)
            })
            .addCase(registerFetch.pending, (state) => {
                state.isLogin = false
                state.user = null
                state.error = null
            })
            .addCase(registerFetch.fulfilled, (state, action) => {
                state.isLogin = true
                state.user = action.payload
                state.error = null
            })
            .addCase(registerFetch.rejected, (state, action) => {
                state.isLogin = false
                state.user = null
                if (action.error.message === 'Request failed with status code 500') { state.error = "Đăng ký thất bại, email hoặc username đã tồn tại!" }
                else if (action.error.message === 'Request failed with status code 400') { state.error = "Bạn cần nhập đủ các mục!" }
            })
            .addCase(currentUserFetch.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                
            })
            .addCase(changePassword.rejected, (state,action) => {
                if (action.error.message === 'Request failed with status code 400') { state.error = "Sai mật khẩu cũ hoặc mật khẩu mới trùng lặp " }
            })
    }
})

const { actions, reducer } = loginSlice
export const { } = actions
export default reducer