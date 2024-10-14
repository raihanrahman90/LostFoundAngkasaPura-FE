import logo from "../../Asset/image 2.png";
import {BsTelephone, BsPeople} from 'react-icons/bs'

export default function Footer() {
  return (
<div className="py-5 px-5">
  <div className="row">
    <div className="col-12 col-md-4 align-self-center">
      <img src={logo} className="mx-auto d-block" alt="" />
    </div>
    <div className="col-12 col-md-4 mt-4 mt-md-0">
      <p className="text-white">
        JL. Marsma. R. Iswahyudi,<br /> Sepinggan Balikpapan Selatan Balikpapan,<br />
        76115 Kalimantan Timur - Indonesia
      </p>

      <p className="text-white">
        Telpon : +62 (0) 542 7577000
        <br />
        Fax    : +62 (0) 542 766832
      </p>
    </div>
    <div className="col-6 col-md-4 mt-4 mt-md-0">
      <div className=" mx-auto d-block">
        <BsTelephone size={24} className="text-white" />
        <p className="text-white ">HOTLINE KAMI <br />172</p>
        
      </div>
      <div className=" mx-auto d-block">
        <BsPeople size={24} className="text-white" />
        <div>
          <p className="text-white ">KIRIM MASUKKAN <br /> cc172@injourneyairports.id</p>
        </div>
      </div>
    </div>
  </div>
  <div className="text-white text-center">
    Copyright © 2023 PT Angkasa Pura I. All Rights Reserved.
  </div>
</div>
  );
}
