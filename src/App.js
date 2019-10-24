import React from 'react';
import './css/App.css';
import './css/App.icon.css';
import './css/App.small.css';
import './css/App.color.css';
import './css/idolIcon.css';

import unitToIdol  from "./data/unitToIdol.json";
import idolToUnit  from "./data/idolToUnit.json";
import unitName    from "./data/unitName.json"
import idolData from "./masterdata/idolData.json";

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

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listIdols: Object.keys(idolToUnit),
      selectedIdols: [],
      selectedUnits: [],
      classNameSuffix: "",
    }
  }

  updateSelectedUnits(idols){
    const selectedUnits = []
    for(const idol of idols){
      for(const unit of idolToUnit[idol]){
        if(selectedUnits.indexOf(unit) === -1){
          selectedUnits.push(unit)
        }
      }
    }
    var unitSortIndex = selectedUnits.map((u,index)=>{
      var match = 0
      var score = 0
      unitToIdol[unitName[u]].map((i)=>{
        //ユニットメンバー1人につき1点
        score += 1
        //選択済みメンバー1人につき100点
        if(idols.indexOf(i) !== -1){
          match ++
          score += 100
        }
        return null
      })
      //ユニットメンバー全員選択済みなら10000点
      if (unitToIdol[unitName[u]].length === match){
        score += 10000
      }
      return {name: unitName[u], index: index, score: score}
    })
    unitSortIndex.sort((a,b)=>{return (a.score > b.score)?-1:1})
    console.log(unitSortIndex)
    return unitSortIndex.map((e)=>{
      return selectedUnits[e.index]
    })
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

  addRandomIdol(){
    if (this.state.selectedIdols.length === this.state.listIdols.length){
      return null
    }
    const notSelectedIdols = this.state.listIdols.filter(v=>this.state.selectedIdols.indexOf(v)===-1)
    this.toggleIdol(notSelectedIdols[Math.floor(Math.random()*notSelectedIdols.length)])
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
            <div className="refineView">
              <form>
                <label>
                  <div
                    className="changestyleBox"
                    onClick={()=>{this.setClassNameSuffix("")}}
                  >
                   <div
                     className="changestyleNameBox"
                    >
                      <input type="radio" name="styles" />
                        Normal
                   </div>
                  </div>
                </label>
               <label>
                  <div
                    className="changestyleBox"
                    onClick={()=>{this.setClassNameSuffix("Small")}}
                  >
                    <div
                      className="changestyleNameBox"
                    >
                      <input type="radio" name="styles" />
                      Small
                   </div>
                  </div>
                </label>
                <label>
                  <div
                    className="changestyleBox"
                    onClick={()=>{this.setClassNameSuffix("Icon")}}
                  >
                    <div
                      className="changestyleNameBox"
                    >
                      <input type="radio" name="styles" />
                      Icon
                    </div>
                  </div>
                </label>
              </form>
            </div>
            <button onClick={()=>this.addRandomIdol()} >ランダムに選択</button>
            <IdolsSelect
              idols={this.state.listIdols}
              selectedIdols={this.state.selectedIdols}
              classNameSuffix={this.state.classNameSuffix}
              onClickHandler={(idol)=>this.toggleIdol(idol)}
            />
            <div className="unitView">
              <div className={`unitList${this.state.classNameSuffix}`}>
                {units}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <hr />
            <center>
              <p>Copyright (c) 2019 雪んこ茶房</p>
              <p><a href="https://github.com/yukinko-tea-room/milli-uni" target="_blank" rel="noopener noreferrer">GtiHub</a></p>
              <p>The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.</p>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
