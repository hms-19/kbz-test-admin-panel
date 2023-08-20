import instance from ".."

export const fetchCategories = async (data) => {
    const res = await instance.post('/categories/list',data)

    return res
}

export const createCategory = async (data) => {
    const res = await instance.post('/categories/create',data)

    return res
}

export const categoryDetail = async (data) => {
    const res = await instance.post('/categories/detail',data)

    return res
}

export const updateCategory = async (data) => {
    const res = await instance.post('/categories/update',data)

    return res
}

export const deleteCategory = async (data) => {
    const res = await instance.post('/categories/delete',data)

    return res
}