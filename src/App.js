import React from 'react';
import './App.icon.css';
import './idolIcon.css';

import unittoidol  from "./unit-to-idol.json";
import idoltounit  from "./idol-to-unit.json";
import idolData from "./idolData.json";

class IdolButton extends React.Component {
  render() {
    var style = {
      borderColor: "#ccc"
    }
    if(this.props.selectedIdols.indexOf(this.props.idol) !== -1){
      style["backgroundColor"] = idolData[this.props.idol].color
      style["borderColor"] = idolData[this.props.idol].color
    }

    return (
      <div
        className={"idolBox"}
        id={this.props.idol}
        style={style} onClick={()=>{
          this.props.onClickHandler(this.props.idol);
        }}
      >
        <div className="boxContainer">
          <div className={`idolImage idolIcon-${this.props.idol}`} />
          <div className={`idolNameBox${this.props.classNameSuffix}`} />
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
        return null
      }
      return(
        <IdolButton
          key={index}
          selectedIdols={this.props.selectedIdols}
          idol={idol}
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
    const unitMember = unittoidol[this.props.unit].map((member, i) => {
        return(
          <IdolButton
            key={i}
            selectedIdols={this.props.selectedIdols}
            idol={member}
            onClickHandler={(idol)=>this.props.toggleClickHandler(idol)}
          />
        );
      }
    );

    return(
      <div key={this.props.unit} className="unitTable">
        <div className="unitNameView">
          <div className="unitNameBox">
            {this.props.unit}
          </div>
        </div>
        <div className="unitIdolView">
          {unitMember}
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

  render() {
    const units = [];
    for(const i of this.state.selectedUnits){
      units.push(
        <UnitItem
          key={i}
          unit={i}
          selectedIdols={this.state.selectedIdols}
          toggleClickHandler={(idol)=>this.toggleIdol(idol)}
        />
      )
    }

    return (
      <div>
        <div className="header">
          <div className="container">
            <h3 className="headerButton">
              MILLIONLIVE!-UNIT-SEARCH
            </h3>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <IdolsSelect
              idols={this.state.listIdols}
              selectedIdols={this.state.selectedIdols}
              onClickHandler={(idol)=>this.toggleIdol(idol)}
            />
            <div className="unitView">
              <div className="unitBox">
                <div className="unitList">
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
