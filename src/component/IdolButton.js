import React from 'react';
import idolData from "../masterdata/idolData.json";

const IdolButton = (props) => {
  const style = {
    borderColor: idolData[props.idol].color
  };

  if(props.selectedIdols.indexOf(props.idol) !== -1){
    style["backgroundColor"] = idolData[props.idol].color;
  }

  return (
    <div
      className={`idol-box${props.classNameSuffix}`}
      id={props.idol}
      style={style}
      onClick={()=>{
        props.onClickHandler(props.idol);
      }}
    >
      <div className="box-container">
        <div className={`idol-image${props.classNameSuffix} idol-icon-${props.idol}`} />
        <div className={`idol-name-box${props.classNameSuffix}`}>
          {idolData[props.idol].screenName}
        </div>
      </div>
    </div>
  );
};

export default IdolButton;
