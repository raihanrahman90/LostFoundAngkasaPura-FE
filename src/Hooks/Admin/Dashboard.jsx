import {defaultAdminRequest} from './Admin'


export const getDataDashboard = async()=>{
    return defaultAdminRequest({url:"admin/dashboard", method:"get", body:{}});
}
