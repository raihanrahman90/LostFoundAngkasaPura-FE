import { useEffect, useState } from 'react';

const TrialMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If it's been more than 24 hours (86400000 ms in a day), show the popup
    setIsVisible(true);
    /*
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date().getTime();
    if (!lastShown || now - lastShown > 86400000) {
      setIsVisible(true);
    }*/
    
  }, []);

  const closePopup = () => {
    // Set the current time as the last shown time
    localStorage.setItem('popupLastShown', new Date().getTime());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="trial">
      <div className="trial-container">
        <div className='trial-header bg-primary text-white'>
          Pengumuman website Lost & Found SAMS Sepinggan Balikpapan
        </div>
        <div className="trial-content">
          <p>Yth Pengguna Jasa Bandara SAMS Sepinggan Balikpapan</p>
          <p>
            Sehubungan dengan penggunaan website Lost & Found SAMS Sepinggan Balikpapan pada masa transisi penggabungan PT Angkasa Pura I dan PT Angkasa Pura II menjadi PT Angkasa Pura Indonesia, 
            maka saat ini website sedang dalam proses maintenance dan pemutakhiran.
          </p>
          <p>
            Sebagai informasi, dalam masa transisi saat ini barang kehilangan khususnya di area terminal Bandara SAMS Sepinggan Balikpapan akan tetap diposting, untuk proses klaim sementara dapat menghubungi Contact Center Angkasa Pura Indonesia.
          </p>
          <p>
            Demikian disampaikan, atas perhatiannya diucapkan terima kasih
          </p>
        <button onClick={closePopup} className='btn btn-primary text-white ml-auto'>Close</button>
      </div>

      </div>
    </div>
  );
};

export default TrialMessage;
