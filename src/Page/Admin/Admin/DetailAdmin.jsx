import React, { useEffect, useState } from 'react'
import { AdminDefault } from '../AdminDefault'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import {getDetailAdmin, resetPassword} from '../../../Hooks/Admin/Admin'
import { LoadingModal } from '../../Loading';

export default function DetailAdmin() {
    const routeParams = useParams();
    const id = routeParams.id;
    const [data, setData] = useState([]);
    const [loading, setLoadings] = useState(false);
    const access = Cookies.get("access");

    const fetchData = async () => {
        const respon = await getDetailAdmin({id});
        setData(respon.data);
    }
    useEffect(() => {
        fetchData();
    },[])

    const handleResetPassword = async () => {
        setLoadings(true);
        try {
            const respon = await resetPassword({id});
            console.log(respon);
            setLoadings(false);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <AdminDefault
        title="Detail Admin"
        body={
            <>
            <LoadingModal isLoading={loading}/>
            <div>
                <div className='row mt-5'>
                    <div className='col-3'>Nama</div>
                    <input type="text" value={data.name} className='form-control w-75' disabled />
                </div>
                <div className='row mt-5'>
                    <div className='col-3'>Email</div>
                    <input type="text" value={data.email} className='form-control w-75' disabled />
                </div>
                <div className='row mt-5'>
                    <div className='col-3'>Access</div>
                    <input type="text" value={data.access} className='form-control w-75' disabled />
                </div>
                {access=="SuperAdmin"?
                <>
                  <button type="button" class="btn btn-danger px-3 me-1 text-white float-end mt-5" data-bs-toggle="modal" data-bs-target="#Tolak">
                    Reset Password
                  </button>
                </>
                :<></>
                }
                

                <div class="modal fade" id="Tolak" tabindex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="TolakLabel">Tolak Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {/* Form filter */}
                        <div className="mb-3">
                          <label htmlFor="namaBarang" className="form-label">Apakah Anda Yakin Ingin Mereset Password <span className='fw-bold'>
                          {data.name} sebagai {data.access}
                            </span>  </label>
                        </div>
                        {/* End of Form filter */}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onClick={handleResetPassword}>Reset Password</button>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
            </>

        }
        />
  )
}
