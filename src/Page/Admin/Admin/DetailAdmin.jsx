import { useEffect, useState } from 'react'
import { AdminDefault } from '../AdminDefault'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import {getDetailAdmin, resetPassword} from '../../../Hooks/Admin/Admin'
import { LoadingModal } from '../../Loading';
import { CookiesAdmin } from '../../../Constants/Cookies';

export default function DetailAdmin() {
    const routeParams = useParams();
    const id = routeParams.id;
    const [data, setData] = useState([]);
    const [loading, setLoadings] = useState(false);
    const access = Cookies.get(CookiesAdmin.access);

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
                  <button type="button" className="btn btn-danger px-3 me-1 text-white float-end mt-5" data-bs-toggle="modal" data-bs-target="#Tolak">
                    Reset Password
                  </button>
                </>
                :<></>
                }
                

                <div className="modal fade" id="Tolak" tabIndex="-1" aria-labelledby="TolakLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="TolakLabel">Tolak Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {/* Form filter */}
                        <div className="mb-3">
                          <label htmlFor="namaBarang" className="form-label">Apakah Anda Yakin Ingin Mereset Password <span className='fw-bold'>
                          {data.name} sebagai {data.access}
                            </span>  </label>
                        </div>
                        {/* End of Form filter */}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary text-white" data-bs-dismiss="modal" onClick={handleResetPassword}>Reset Password</button>
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
