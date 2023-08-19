import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Asset/logo.png';
import { AdminDefault } from './AdminDefault';

export default function Setting() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log(password);
    }, [password]);

    return (
        <AdminDefault 
        title="Setting"
        body={
        <div className=' '>
            <div className='p-5 rounded '  >
                <div className='mt-4'>
                    <form onSubmit={()=>{}} >
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='Email Baru'
                        className='form-control mt-3 p-3'
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
