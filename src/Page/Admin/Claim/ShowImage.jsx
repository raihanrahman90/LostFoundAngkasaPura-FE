import { useLocation } from 'react-router-dom'

export default function ShowImage() {
    const location = useLocation();
    const img = location.state.from;

    if (!img) {
        return <div>Image not found</div>
    }

  return (
    <div>
      <h1>
        <img src={img} alt="" className='w-100 h-100'/>
      </h1>
    </div>
  )
}
