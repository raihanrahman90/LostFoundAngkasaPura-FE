import React, {useEffect, useState} from 'react';
import logo from '../../Asset/logo.png';

export default function LoginAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => { 
        if(email === 'admin' && password === 'admin') {
            alert('login berhasil')
        }   else {
            alert('login gagal')
        }
        e.preventDefault()
        console.log(email, password)
    }

    // useEffect(() => {
    //     fetch('').then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
    // }, [])
  return (
    <div>
      <div className='row'>
        <div className='col-6 d-flex align-items-center'>
          {/* img center */}
          <div className="mx-auto">
            <img className='mt-5' src={logo} alt="" />
            <br />
            <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required />
            <br />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required />
            <br />
            <button onClick={handleSubmit} type="submit">Login</button>
          </div>
        </div>

        <div className='col-6 d-flex align-items-center'>
          <h1 className='text-center mx-auto'>jamal</h1>
        </div>
      </div>
    </div>
  );
}
