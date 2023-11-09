import {defaultAdminRequest} from './Admin'

export const getDataChart = async(startDate,endDate )=>{
    return defaultAdminRequest({url:`admin/dashboard/grafik?startDate=${startDate}&endDate=${endDate}`, method:"get", body:{}});
}