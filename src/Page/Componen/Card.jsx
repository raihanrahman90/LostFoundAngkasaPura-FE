import { Link } from "react-router-dom"

export const Card = ({id,image, name, description})=>{
    return <div
            className="col-md-3 mb-3"
        >
            <div className="card rounded px-0 overflow-hidden">
            <div className="card-image-container">
                <img src={image} className="card-image" alt="" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <Link
                to={"/Barang/"+id}
                className="btn btn-primary w-100 text-white fw-bold"
                >
                Klaim Barang
                </Link>
            </div>
            </div>
        </div>
}