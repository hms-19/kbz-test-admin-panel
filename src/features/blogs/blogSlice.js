import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data : [],
    total_count : 0,
    detail: {}
}

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers:{
        setBlogs : (state,{payload}) => {
            state.data = payload.data
            state.total_count = payload.total_count
        },

        setBlogDetail : (state,{payload}) => {
            state.detail = payload.detail
        },

        removeBlogs : (state,{payload}) => {
            state.data = state.data.filter(d => d.id !== payload)
        },

    }
})

export const { setBlogs,setBlogDetail, removeBlogs } = blogsSlice.actions

export const getBlogs = (state) => state.blogs.data
export const getBlogTotalCount = (state) => state.blogs.total_count
export const getBlogDetail = (state) => state.blogs.detail


export default blogsSlice.reducer