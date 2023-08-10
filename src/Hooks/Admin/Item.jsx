import {defaultAdminRequst} from './Admin'

export const addItem = async ({
    name, description, category, foundDate, imageBase64
})=>{
    return await defaultAdminRequst(`/Admin/Item-Found`, 'post',{
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
        console.error(new Error("TOLOOOOOOONG"));
    }
    );
};


export const getListItem = async () => {
    return await defaultAdminRequst(`/Admin/Item-Found?foundDate=2023-07-30&name=Tas&category=Tas&status=Found`, 'get', {})
    .then((res)=>{
        console.log(res.data)
        return res.data
    }
    )
    .catch((error)=>{
        console.error(new Error("TOLOOOOOOONG"));
    }
    );
}


