import {defaultAdminRequest} from './Admin'

export const addItem = async ({
    name, description, category, foundDate, imageBase64
})=>{
    return await defaultAdminRequest({url:'/Admin/Item-Found', method:'post',body:{
        name:name,
        description:description,
        category:category,
        foundDate:foundDate,
        imageBase64:imageBase64
    }})
    .then((res)=>{
        console.log(res.data)
        return res.data
    }
    )
    .catch((error)=>{
        console.error(new Error("TOLOOOOOOONG"));
    }
    );
};


export const sendCloseItem = async({id})=>{
    return defaultAdminRequest({url:"admin/item-found/"+id+"/closed", method:"post", body:{}});
}

export const getCategory = async()=>{
    return defaultAdminRequest({url:"admin/item-found/category", method:"get", body:{}});
}


