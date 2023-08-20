import instance from "../"

export const fetchBlogs = async (data) => {
    const res = await instance.post('/blogs/list',data)

    return res
}

export const createBlog = async (data) => {
    const res = await instance.post('/blogs/create',data)

    return res
}

export const blogDetail = async (data) => {
    const res = await instance.post('/blogs/detail',data)

    return res
}

export const updateBlog = async (data) => {
    const res = await instance.post('/blogs/update',data)

    return res
}

export const deleteBlog = async (data) => {
    const res = await instance.post('/blogs/delete',data)

    return res
}