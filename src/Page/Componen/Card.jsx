import { Link } from "react-router-dom"

export const Card = ({id,image, name, description,category})=>{
    return <div className="col-lg-3 mb-3 col-6 px-1 card-barang px-md-3">
            <div className="card rounded px-0 overflow-hidden shadow border-0">
                <div className="card-image-container">
                    <img src={image} className="card-image" alt="" />
                </div>
                <div className="card-body">
                    <div className="badge bg-success">{category}</div>
                    <h6 className="card-title ">{name}</h6>
                    <p className="card-text element">{description}</p>
                    <Link
                    to={"/Barang/"+id+"#title"}
                    className="btn btn-primary w-100 text-white fw-bold"
                    >
                    Klaim Barang
                    </Link>
                </div>
            </div>
        </div>
}