import {blobAdminRequest, defaultAdminRequest} from './Admin'

export const getDataChart = async(startDate,endDate )=>{
    return defaultAdminRequest({url:`admin/dashboard/grafik?startDate=${startDate}&endDate=${endDate}`, method:"get", body:{}});
}

export const downloadChart = async(startDate, endDate)=>{
    return blobAdminRequest({url:`admin/dashboard/download?startDate=${startDate}&endDate=${endDate}`, method:"get", body:{}});
}