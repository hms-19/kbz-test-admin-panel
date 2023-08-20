import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data : [],
    total_count : 0,
    detail: {}
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: initialState,
    reducers:{
        setTags : (state,{payload}) => {
            state.data = payload.data
            state.total_count = payload.total_count
        },

    }
})

export const { setTags } = tagsSlice.actions

export const getTags = (state) => state.tags.data

export default tagsSlice.reducer