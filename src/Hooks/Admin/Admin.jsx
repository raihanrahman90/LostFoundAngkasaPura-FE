import { defaultRequest } from "../DefaultRequest"
export const login = async ({
    email, password
})=>{
    return await defaultRequest
    .post(`/admin/admin/login`, {
        email:email,
        password:password
    })
    .then((res)=>{
        return res.data
    })
    .catch((error)=>{
        console.error(new Error("TOLOOOOOOONG"));
    });
};