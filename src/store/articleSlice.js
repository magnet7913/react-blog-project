import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mappingArticleData } from "../helpers";
import articleService from "../services/articleService";

const initialState = {
    latestList: [],
    popularList: [],
    randomList: {
        list: [],
        currentPage: 1,
        totalPages: 0
    },
    bySlug: [],
    relatedPost: [],
    byCategory: {
        list: [],
        currentPage: 1,
        totalPages: 2
    },
    byKeyword: {
        list: [],
        currentPage: 1,
        totalPages: 2
    },
}

export const fetchLatestArticleList = createAsyncThunk('latestArticle/fetchList',
    async (params, thunkAPI) => {
        try {
            const response = await articleService.getLatest()
            const data = response.data.map(mappingArticleData)
            return data
        } catch (err) {
            console.log(err)
        }
    })

export const fetchPopularArticleList = createAsyncThunk('popularArticle/fetchList',
    async (params, thunkAPI) => {
        try {
            const response = await articleService.getPopular()
            const data = response.data.map(mappingArticleData)
            return data
        } catch (err) {
            console.log(err)
        }
    })

export const fetchRandomArticleList = createAsyncThunk('randomArticle/fetchList',
    async (page, thunkAPI) => {
        try {
            const response = await articleService.getRandom(page)
            const data = response.data.map(mappingArticleData)
            return {
                list: data,
                currentPage: page,
                totalPages: parseInt(response.headers["x-wp-totalpages"])
            }
        } catch (err) {
            console.log(err)
        }
    })

export const fetchArticleBySlug = createAsyncThunk('ArticleSlug/fetchList',
    async (slug, thunkAPI) => {
        try {
            const response = await articleService.getBySlug(slug)
            const data = response.data.map(mappingArticleData)
            return {
                data
            }
        } catch (err) {
            console.log(err)
        }
    })

export const fetchArticleByAuthor = createAsyncThunk('RelatedPost/fetchList',
    async (authorID, thunkAPI) => {
        try {
            const response = await articleService.getByAuthor(authorID)
            const data = response.data.map(mappingArticleData)
            return {
                data
            }
        } catch (err) {
            console.log(err)
        }
    })

export const fetchArticleByCategory = createAsyncThunk('byCategory/fetchList',
    async (obj, thunkAPI) => {
        try {
            const response = await articleService.getByCategory(obj)
            const data = response.data.map(mappingArticleData)
            return {
                list: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"])
            }

        } catch (err) {
            console.log(err)
        }
    })

export const fetchArticleByKeyword = createAsyncThunk('SearchPost/fetchList',
    async (obj, thunkAPI) => {
        try {
            const response = await articleService.getByKeyword(obj)
            const data = response.data.map(mappingArticleData)
            console.log(parseInt(response.headers["x-wp-totalpages"]))
            return {
                list: data,
                currentPage: obj[1],
                totalPages: parseInt(response.headers["x-wp-totalpages"])
            }
        } catch (err) {
            console.log(err)
        }
    })

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        clearSlug: (state) => {
            state.bySlug = []
        },
        clearCate: (state) => {
            state.byCategory = {
                list: [],
                currentPage: 1
            }
        },
        clearRelated: (state) => {
            state.relatedPost = []
        }
        ,
        clearRandom: (state) => {
            state.randomList.list = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLatestArticleList.fulfilled, (state, action) => {
            state.latestList = action.payload
        })
            .addCase(fetchPopularArticleList.fulfilled, (state, action) => {
                state.popularList = action.payload
            })
            .addCase(fetchRandomArticleList.fulfilled, (state, action) => {
                state.randomList = {
                    ...action.payload,
                    list: [...state.randomList.list, ...action.payload.list]
                }
            })
            .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
                state.bySlug = action.payload
            })
            .addCase(fetchArticleByAuthor.fulfilled, (state, action) => {
                state.relatedPost = action.payload
            })
            .addCase(fetchArticleByCategory.fulfilled, (state, action) => {
                state.byCategory = {
                    ...action.payload,
                    list: [...state.byCategory.list, ...action.payload.list],
                }
            })
            .addCase(fetchArticleByKeyword.fulfilled, (state, action) => {
                state.byKeyword = {
                    ...action.payload,
                    list: [...state.byKeyword.list, ...action.payload.list]
                }
            })
    }
})

const { actions, reducer } = articleSlice
export const { clearSlug, clearCate, clearRelated, clearRandom } = actions
export default reducer