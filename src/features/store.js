import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './blogs/blogSlice'
import categoriesReducer from './categories/categoriesSlice'
import tagsReducer from './tags/tagsSlice'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
  },
})

