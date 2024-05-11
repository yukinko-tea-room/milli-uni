import React from "react"
import unitToIdol from "../unitToIdol.json";
import unitName from "../unitName.json"
import IdolButton from "./IdolButton";

class UnitItem extends React.Component {
  render(){
    const unitMember = unitToIdol[unitName[this.props.unit]]
    unitMember.sort((a,b)=>{
      return (this.props.selectedIdols.indexOf(b)!==-1)?1:-1
    })
    const memberButtons = unitMember.map((member, i) => {
      return(
        <IdolButton
          key={i}
          selectedIdols={this.props.selectedIdols}
          idol={member}
          classNameSuffix={this.props.classNameSuffix}
          onClickHandler={(idol)=>this.props.toggleClickHandler(idol)}
        />
      )
    });
    const selectedMember = unitMember.filter(idol=>this.props.selectedIdols.indexOf(idol)!==-1)
    const completeClassName = (selectedMember.length === unitMember.length)?"unitComplete":""

    return(
      <div key={this.props.unit} className={`unitTable${this.props.classNameSuffix} ${completeClassName}`}>
        <div className={`unitNameView${this.props.classNameSuffix}`}>
          <div className={`unitNameBox${this.props.classNameSuffix}`}>
            {unitName[this.props.unit]}
          </div>
        </div>
        <div className="unitIdolView">
          {memberButtons}
        </div>
      </div>
    )
  }
}

export default UnitItem;
