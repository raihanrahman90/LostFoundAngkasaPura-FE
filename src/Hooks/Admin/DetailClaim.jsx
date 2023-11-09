import {defaultAdminRequest} from './Admin'

export const postComment  = async({
    itemClaimId,value,imageBase64
})=>{
    return defaultAdminRequest({url:'/Admin/Item-Comment', method:'post',body:{
        itemClaimId:itemClaimId,
        value:value,
        imageBase64:imageBase64
    }});
}

export const tolakHandleDetailClaim = async({id, rejectReason})=>{
    return defaultAdminRequest({url:`/Admin/Item-Claim/${id}/reject`, method:"post", body:{
        rejectReason:rejectReason
    }});
}


export const terimaHandleDetailClaim = async({id, claimLocation,claimDate})=>{
    return defaultAdminRequest({url:`/Admin/Item-Claim/${id}/approve`, method:"post", body:{
        claimLocation:claimLocation,
        claimDate:claimDate
    }});
}