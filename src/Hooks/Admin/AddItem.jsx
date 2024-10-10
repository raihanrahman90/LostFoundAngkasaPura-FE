import {authRequest, instance} from '../DefaultRequest'

export const addItem = async ({
    name, description, category, foundDate, imageBase64
})=>{
    return await authRequest
    .post(`/Admin/Item-Found`, {
        name:name,
        description:description,
        category:category,
        foundDate:foundDate,
        imageBase64:imageBase64
    })
    .then((res)=>{
        return res.data
    }
    )
    .catch((error)=>{
        console.error(error);
    }
    );
};


export const geListItem = async () => {
    return await instance
    .get(`/Admin/Item-Found?foundDate=2023-07-30&name=Tas&category=Tas&status=Found`)
    .then((res)=>{
        console.log(res.data)
        return res.data
    }
    )
    .catch((error)=>{
        console.error(error);
    }
    );
}


