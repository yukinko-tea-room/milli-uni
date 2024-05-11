import React from "react"
import idolData from "../idolData.json";

class IdolButton extends React.Component {
  render() {
    var style = {
      borderColor: idolData[this.props.idol].color
    }
    if(this.props.selectedIdols.indexOf(this.props.idol) !== -1){
      style["backgroundColor"] = idolData[this.props.idol].color
    }

    return (
      <div
        className={`idolBox${this.props.classNameSuffix}`}
        id={this.props.idol}
        style={style} onClick={()=>{
          this.props.onClickHandler(this.props.idol);
        }}
      >
        <div className="boxContainer">
          <div className={`idolImage${this.props.classNameSuffix} idolIcon-${this.props.idol}`}></div>
          <div className={`idolNameBox${this.props.classNameSuffix}`}>
            {idolData[this.props.idol].screenName}
          </div>
        </div>
      </div>
    );
  }
}

export default IdolButton;
