import loadingGif from '../Asset/loading.gif';
export const LoadingPage = ()=>{
    return <>
        <div id="loading">
            <img src={loadingGif}/>
        </div>
    </>
}
export const LoadingModal = ({isLoading})=>{
    return <>
        {isLoading?<LoadingPage/>:<></>}
    </>
}