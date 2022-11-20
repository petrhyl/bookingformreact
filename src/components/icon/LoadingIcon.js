import cssStyles from "./LoadingIcon.module.css";

const LoadingIcon=()=>{
    return(
        <div className={cssStyles.area}>
            <div className={cssStyles.icon}></div>
        </div>
    );
}

export default LoadingIcon;