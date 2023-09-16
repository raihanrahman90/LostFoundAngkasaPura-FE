import { Status } from "../Constants/Status";
export const statusBadge=(status)=>{
    switch (status) {
        case Status.Confirmed:
            return <span className="badge bg-success">{status}</span>;
        case Status.Confirmation:
            return <span className="badge bg-warning">{status}</span>;
        case Status.Rejected:
            return <span className="badge bg-danger">{status}</span>;
        case Status.Approved:
            return <span className="badge bg-success">{status}</span>;
        case Status.Found:
            return <span className="badge bg-secondary">{status}</span>;
        case Status.Closed:
            return <span className="badge bg-secondary">{status}</span>;
        default:
            return "";
    }
}
export const getBase64 = (file)=>{
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return document;
}