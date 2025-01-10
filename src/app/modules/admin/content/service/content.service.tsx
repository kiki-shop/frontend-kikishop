import { axiosPrivate } from '../../../../api/configHttp';

export const getAllContent = async () => {
    return await axiosPrivate.get('/content')
}

export const deleteContent = async (id: any) => {
    return await axiosPrivate.delete('/content/' + id)
}

export const createContent = async (dataBody: any) => {
    return await axiosPrivate.post("/content/add", dataBody)
}

export const changeContent = async (bodyRequest: any, id: any) => {
    return await axiosPrivate.put('/content/edit/' + id, bodyRequest)
}

export const searchContent = async (keywork: any) => {
    return await axiosPrivate.get(`/content/search?hidden=${keywork}`)
}