import style from "./LoadingComponent.module.css"


function LoadingComponent() {
  return (
    <div className={style.LoadingComponent}>
      <div className={style.loader}>
        <div className={style.isometric}>
          <div className={style.box} ></div>
          <div className={style.box}></div>
          <div className={style.box}></div>
          <div className={style.box}></div>
        </div>
        <h1>
          LOADING<span>...</span>
        </h1>
      </div>
      <ui-loader></ui-loader>
    </div>
  );
}

export default LoadingComponent;
