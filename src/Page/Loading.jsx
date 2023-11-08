import loadingGif from '../Asset/loading.gif';
export const LoadingPage = ()=>{
    return <>
        <div className="loading">
            <img src={loadingGif}/>
        </div>
    </>
}
export const LoadingModal = ({isLoading})=>{
    return <>
        {isLoading?<LoadingPage/>:<></>}
    </>
}

export const LoadingPartial = ({isLoading}) => {
    return <>
        {isLoading?<>
        <div className="loading-partial">
            <img src={loadingGif}/>
        </div></>:<></>}
    </>
}