import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    data : [],
    total_count : 0,
    detail: {}
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers:{
        setCategories : (state,{payload}) => {
            state.data = payload.data
            state.total_count = payload.total_count
        },

    }
})

export const { setCategories } = categoriesSlice.actions

export const getCategories = (state) => state.categories.data


export default categoriesSlice.reducer