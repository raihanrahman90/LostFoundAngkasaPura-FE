import React, { useState } from 'react';
import logo from '../../Asset/logo.png';
import bg from '../../Asset/background_1.png';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      alert('Login berhasil');
      window.location.href = '/admin/dashboard';
    } else {
      alert('Login gagal');
    }
    console.log(email, password);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6 d-flex align-items-center">
          {/* img center */}
          <div className="mx-auto p-4">
            <img className="mb-4 mx-auto d-block" src={logo} alt="Logo" />
            <form className="pt-5">
              <div className="form-group">
                <input
                  style={{ width: "500px" }}
                  className='pt-2 pb-2 mt-4 rounded'
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  style={{ width: "500px" }}
                  className='pt-2 pb-2 mt-4 rounded'
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary mt-4 w-100" onClick={handleSubmit} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="col-6 d-flex align-items-center" style={{ height: "100%" }}>
          <img className="img-fluid w-50" src={bg} alt="Background" />
        </div>
      </div>
    </div>
  );
}
