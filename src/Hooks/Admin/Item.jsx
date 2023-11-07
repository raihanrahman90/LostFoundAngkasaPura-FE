import {defaultAdminRequest} from './Admin'

export const addItem = async ({
    name, description, category, foundDate, imageBase64
})=>{
    return defaultAdminRequest({url:'/Admin/Item-Found', method:'post',body:{
        name:name,
        description:description,
        category:category,
        foundDate:foundDate,
        imageBase64:imageBase64
    }});
};


export const sendCloseItem = async({id, image, news, agent})=>{
    return defaultAdminRequest({url:"admin/item-found/"+id+"/closed", method:"post", body:{
        image:image,
        news:news,
        agent:agent
    }});
}

export const getCategory = async()=>{
    return defaultAdminRequest({url:"admin/item-found/category", method:"get", body:{}});
}


