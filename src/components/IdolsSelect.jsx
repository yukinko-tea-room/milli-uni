import React from "react"
import idolData from "../data/idolData.json";
import IdolButton from "./IdolButton";

class IdolsSelect extends React.Component {
  constructor(props){
    super(props)
    this.state={
      filterType: ["princess", "fairy", "angel"],
    }
  }

  setFilter(type){
    if(this.state.filterType.indexOf(type) !== -1){
      const filterType = this.state.filterType.filter(v=>v!==type)
      this.setState({filterType: filterType})
    }else{
      const filterType = this.state.filterType
      filterType.push(type)
      this.setState({filterType: filterType})
    }
  }
  
  filterButtonBuilder(type){
    return(
      <label>
        <div
          className={`filterCheckboxType filterCheckbox-${type} ${(this.state.filterType.indexOf(type)!==-1)?"checked":""}`}
        >
          <div className="typeNameBox">
            <input
              type="checkbox"
              checked={(this.state.filterType.indexOf(type)!==-1)?"checked":""}
              onChange={()=>this.setFilter(type)}
            />
            {type}
          </div>
        </div>
      </label>
    )
  }

  render() {
    const buttons = this.props.idols.map((idol, index) => {
      if(this.state.filterType.indexOf(idolData[idol].type) === -1){
        if(this.state.filterType.indexOf("selecting") === -1 ||
           this.props.selectedIdols.indexOf(idol) === -1){
          return null
        }
      }
      return(
        <IdolButton
          key={index}
          selectedIdols={this.props.selectedIdols}
          idol={idol}
          classNameSuffix={this.props.classNameSuffix}
          onClickHandler={(idol)=>this.props.onClickHandler(idol)}
        />
      );
    });
    return (
      <div className="idolView">
        <form>
          {this.filterButtonBuilder("princess")}
          {this.filterButtonBuilder("fairy")}
          {this.filterButtonBuilder("angel")}
          {this.filterButtonBuilder("selecting")}
        </form>
        {buttons}
      </div>
    );
  }
}

export default IdolsSelect;
