import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Asset/logo.png';
import { AdminDefault } from './AdminDefault';
import { getProfile, updateProfile } from '../../Hooks/Admin/Admin';
export default function Setting() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log(password);
    }, [password]);

    useEffect(()=>{
        getProfile()
        .then((e)=>{
            setEmail(e.data.email);
        })
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(showPassword && password.trim() == ""){
            alert("Mohon isi password atau hapus centang pada kolom update password")
        }
        else
        {
            updateProfile({email:email, updatePassword:showPassword, password:password})
            .then((e)=>{
                alert("Berhasil mengubah data");
                setEmail(e.data.email);
            })
            .catch((e)=>{
                alert(e.data.data);
            })
        }
    }

    return (
        <AdminDefault 
        title="Setting"
        body={
        <div className=' '>
            <div className='p-5 rounded '  >
                <div className='mt-4'>
                    <form onSubmit={handleSubmit} >
                        <input
                            type='email'
                            name='email'
                            required
                            placeholder='Email Baru'
                            className='form-control mt-3 p-3'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <label className='mt-3' htmlFor=''>
                            <input
                                type='checkbox'
                                name='checkbox'
                                className='form-check-input'
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                            />
                            <span className='form-check-label'>Ubah Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='New Password'
                            className={'form-control p-3 mt-3 ' + (showPassword ? 'd-inline' : 'd-none')}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button type='submit' className='form-control mt-3 btn btn-primary text-white'>Simpan</button>
                    </form>
                </div>
            </div>
        </div>
        }
        />
    );
}
