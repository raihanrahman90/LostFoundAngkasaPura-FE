import { defaultUserRequest } from "./Default";


export const listItemClaim= async (page)=>{
    var url = '/Item-Claim?page='+page;
    return await defaultUserRequest(url, 'get', "");
}

export const getDetailFoundClaim= (id)=>{
    var url = '/Item-Claim/'+id;
    return defaultUserRequest(url, 'get', "");
}

export const createClaim=({itemFoundId, identityNumber, identityType, proofDescription, proofImageBase64})=>{
    var url = '/Item-Claim';
    var body = {
        itemFoundId:itemFoundId, 
        identityNumber:identityNumber, 
        identityType:identityType,
        proofDescription:proofDescription,
        proofImageBase64:proofImageBase64
    }
    return defaultUserRequest(url, 'post', body);
}

export const getComment = (itemClaimId)=>{
    var url = '/Item-Claim/'+itemClaimId+"/comment";
    return defaultUserRequest(url, 'get', "");
}
export const sendComment = ({itemClaimId, comment, image})=>{
    var url = '/Item-Claim/'+itemClaimId+"/comment";
    var body = {
        itemClaimId : itemClaimId,
        value : comment,
        imageBase64 : image
    }
    return defaultUserRequest(url, 'post', body);
}