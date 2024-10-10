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

export const getItemFound = async({page,namaBarang, tglStart, tglEnd, kategori, status})=>{
    let url = `/Admin/Item-Found?page=${page}`;
    if(namaBarang.trim() != ""){
      url = `${url}&name=${namaBarang}`;
    }
    if(tglStart.trim() != ""){
      url = `${url}&foundDateStart=${tglStart}`;
    }
    if(tglEnd.trim() != ""){
      url = `${url}&foundDateEnd=${tglEnd}`;
    }
    if(kategori.trim() != ""){
      url = `${url}&category=${kategori}`;
    }
    if(status.trim()!=""){
      url = `${url}&status=${status}`;
    }
    return defaultAdminRequest({url:url, method:"get", body:{}});
}


export const getItemFoundById = async(id)=>{
  let url = `/Admin/Item-Found/${id}`;
  return defaultAdminRequest({url:url, method:"get", body:{}});
}

export const postComment = async(itemClaimId, comment, image64)=>{
  
  return defaultAdminRequest({url:'/Admin/Item-Comment', method:'post',body:{
    itemClaimId: itemClaimId,
    value : comment,
    imageBase64 : image64 
  }})
}

export const approveClaim = async(itemClaimId, date, location)=>{
  return defaultAdminRequest({url:`/Admin/Item-Claim/${itemClaimId}/approve`, method:'post',body:{
    claimLocation: location,
    claimDate: date
  }})
}

export const rejectClaim = async(itemClaimId, rejectReason)=>{
  return defaultAdminRequest({url:`/Admin/Item-Claim/${itemClaimId}/reject`, method:'post',body:{
    rejectReason:rejectReason
  }})
}