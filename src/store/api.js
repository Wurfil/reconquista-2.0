import {http} from "@/service/api.js";

export const getAnswer = async (message) => {
    const data = await http.post(`/ask`, {
        headers: {
            'ngrok-skip-browser-warning': 'fafaf'
        },
        query: message
    })
    console.log(data)
    return data
}


export const uploadingNewDocument = async (files, name) => {
    const formData = new FormData();

    formData.append('files', files);

    const { data } = await http.post(`/add_base/`, {
        body: {
            formData,
            name
        },
    });

    return data.value;
}
