import { BsFillStarFill } from "react-icons/bs"

export const RatingStar = ({rating})=>{
    return <>
        <BsFillStarFill className={rating>0?"text-warning":""}/>
        <BsFillStarFill className={rating>1?"text-warning":""}/>
        <BsFillStarFill className={rating>2?"text-warning":""}/>
        <BsFillStarFill className={rating>3?"text-warning":""}/>
        <BsFillStarFill className={rating>4?"text-warning":""}/>
    </>
}