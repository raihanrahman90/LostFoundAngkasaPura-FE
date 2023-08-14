import React from 'react'
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
        <img src={img} alt="" />
      </h1>
    </div>
  )
}
