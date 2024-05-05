import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { } from "../helpers"
import loginAndRegisterService from "../services/loginAndRegisterService";

const initialState = {
    isLogin: false,
    user: null,
    error: null
}

export const loginFetch = createAsyncThunk('user/login',
    async (userCredentials, thunkAPI) => {
        {
            const response = await loginAndRegisterService.getToken(userCredentials);
            const data = response.data
            localStorage.setItem('user', JSON.stringify(data))
            return data
        }
    })

export const logout = createAsyncThunk('user/logout',
    async (thunkAPI) => {
        localStorage.removeItem('user')
    }
)

export const checkLogin = createAsyncThunk('user/checkLogin',
    async (thunkAPI) => {
        const value = JSON.parse(localStorage.getItem('user'))
        return value
    }
)

export const registerFetch = createAsyncThunk('user/register',
    async (userCredentials, thunkAPI) => {
        {
            const response = await loginAndRegisterService.newRegister(userCredentials);
            const data = response.data
            return data
        }
    })

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginFetch.pending, (state) => {
            state.isLogin = false,
                state.user = null,
                state.error = null
        })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.isLogin = true,
                    state.user = action.payload,
                    state.error = null
            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.isLogin = false,
                    state.user = null;
                if (action.error.message === 'Request failed with status code 403') { state.error = "Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu!" }
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogin = false,
                    state.user = null,
                    state.error = null
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(registerFetch.pending, (state) => {
                state.isLogin = false,
                    state.user = null,
                    state.error = null
            })
            .addCase(registerFetch.fulfilled, (state, action) => {
                state.isLogin = true,
                    state.user = action.payload,
                    state.error = null
            })
            .addCase(registerFetch.rejected, (state, action) => {
                state.isLogin = false,
                    state.user = null;
                if (action.error.message === 'Request failed with status code 500') { state.error = "Đăng ký thất bại, email hoặc username đã tồn tại!" }
                else if (action.error.message === 'Request failed with status code 400') { state.error = "Bạn cần nhập đủ các mục!" }
            })
    }
})

const { actions, reducer } = loginSlice
export const { } = actions
export default reducer