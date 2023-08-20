import instance from ".."

export const fetchTags = async (data) => {
    const res = await instance.post('/tags/list',data)

    return res
}

export const createTag = async (data) => {
    const res = await instance.post('/tags/create',data)

    return res
}

export const tagDetail = async (data) => {
    const res = await instance.post('/tags/detail',data)

    return res
}

export const updateTag = async (data) => {
    const res = await instance.post('/tags/update',data)

    return res
}

export const deleteTag = async (data) => {
    const res = await instance.post('/tags/delete',data)

    return res
}