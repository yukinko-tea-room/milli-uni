import React from 'react';
import './App.css';
import './App.icon.css';
import './App.small.css';
import './idolIcon.css';

import unittoidol  from "./unit-to-idol.json";
import idoltounit  from "./idol-to-unit.json";
import idolData from "./idolData.json";

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
          className={`filterCheckboxType${this.props.classNameSuffix} filterCheckbox-${type} ${(this.state.filterType.indexOf(type)!==-1)?"checked":""}`}
        >
          <div className={`typeNameBox${this.props.classNameSuffix}`}>
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
        return null
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
        </form>
        {buttons}
      </div>
    );
  }
}

class UnitItem extends React.Component {
  render(){
    const unitMember = unittoidol[this.props.unit]
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
            {this.props.unit}
          </div>
        </div>
        <div className="unitIdolView">
          {memberButtons}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listIdols: Object.keys(idoltounit),
      selectedIdols: [],
      selectedUnits: [],
      classNameSuffix: "",
    }
  }

  updateSelectedUnits(idols){
    const selectedUnits = []
    for(const idol of idols){
      for(const unit of idoltounit[idol]){
        if(selectedUnits.indexOf(unit) === -1){
          selectedUnits.push(unit)
        }
      }
    }
    selectedUnits.sort((a,b)=>{
      return (unittoidol[a].length > unittoidol[b].length)?-1:1
    })
    selectedUnits.sort((a,b)=>{
        const selectedMember = unittoidol[a].filter(idol=>idols.indexOf(idol)!==-1)
        return (selectedMember.length === unittoidol[a].length)?-1:1 
    })
    return selectedUnits;
  }
  
  toggleIdol(idol) {
    if ( this.state.selectedIdols.indexOf(idol) === -1 ){
      const selected = this.state.selectedIdols.slice()
      selected.push(idol);
      const units = this.updateSelectedUnits(selected)
      this.setState({ selectedIdols: selected, selectedUnits: units });
    } else {
      const selected = this.state.selectedIdols.filter(v=>v!==idol);
      const units = this.updateSelectedUnits(selected)
      this.setState({ selectedIdols: selected, selectedUnits: units });
    }
  }
  setClassNameSuffix(suffix){
    this.setState({classNameSuffix: suffix})
  }

  render() {
    const units = [];
    for(const i of this.state.selectedUnits){
      units.push(
        <UnitItem
          key={i}
          unit={i}
          selectedIdols={this.state.selectedIdols}
          classNameSuffix={this.state.classNameSuffix}
          toggleClickHandler={(idol)=>this.toggleIdol(idol)}
        />
      )
    }

    return (
      <div>
        <div className="header">
          <div className="container">
            <div className="headerView">
              <div className="headerTitleView">
                <h3 className="headerTitleBox">
                MILLIONLIVE!-UNIT-SEARCH
                </h3>
              </div>
            <div className="headerMenuView">
            </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <form>
              <label>
                <div
                  className={`changestyleBox${this.state.classNameSuffix}`}
                  onClick={()=>{this.setClassNameSuffix("")}}
                >
                  <div
                    className={`changestyleNameBox${this.state.classNameSuffix}`}
                  >
                    <input type="radio" name="styles" />
                    Normal
                  </div>
                </div>
              </label>
              <label>
                <div
                  className={`changestyleBox${this.state.classNameSuffix}`}
                  onClick={()=>{this.setClassNameSuffix("Small")}}
                >
                  <div
                    className={`changestyleNameBox${this.state.classNameSuffix}`}
                  >
                    <input type="radio" name="styles" />
                    Small
                  </div>
                </div>
              </label>
              <label>
                <div
                  className={`changestyleBox${this.state.classNameSuffix}`}
                  onClick={()=>{this.setClassNameSuffix("Icon")}}
                >
                  <div
                    className={`changestyleNameBox${this.state.classNameSuffix}`}
                  >
                    <input type="radio" name="styles" />
                    Icon
                  </div>
                </div>
              </label>
            </form>
            <IdolsSelect
              idols={this.state.listIdols}
              selectedIdols={this.state.selectedIdols}
              classNameSuffix={this.state.classNameSuffix}
              onClickHandler={(idol)=>this.toggleIdol(idol)}
            />
            <div className="unitView">
              <div className="unitBox">
                <div className={`unitList${this.state.classNameSuffix}`}>
                  {units}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <hr />
            <center>
              <p>Copyright (c) 2019 雪んこ茶房</p>
              <p>The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.</p>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
