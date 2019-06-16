import React from 'react';
import './App.css';

import unittoidol  from './unit-to-idol.json';
import idoltounit  from './idol-to-unit.json';
import idolData from './idolData.json'

class IdolButton extends React.Component {
  render() {
    const style = {
      backgroundColor: idolData[this.props.idol].color
    }
    return (
      <div
        className="idolBox"
        style={style}
        href="#"
        onClick={
          ()=>{
            this.props.onClickHandler(this.props.idol);
          }
        }
      >
        <div class="textContainer">
          <div class="idolNameBox">{this.props.idol}</div>
        </div>
      </div>
    );
  }
}

class IdolsSelect extends React.Component {
  render() {
    const buttons = this.props.idols.map((idol, index) => {
      return(
        <IdolButton key={index} idol={idol} onClickHandler={(idol)=>this.props.onClickHandler(idol)}/>
      );
    });
    return (
      <div class="idolView">
        {buttons}
      </div>
    );
  }
}

class IdolItem extends React.Component {
  render(){
    const units = idoltounit[this.props.idol].map((unit, i) => {
      const unit_member = unittoidol[unit].filter(x => x!==this.props.idol).map((member, i) => {
        return(
          <IdolButton key={i} idol={member} onClickHandler={(idol)=>this.props.toggleClickHandler(idol)} />
        );
      });
      return (
        <div class="unitTable">
          <div class="unitName">
            {unit}
          </div>
          {unit_member}
        </div>
      );
    });

    const style = {
      backgroundColor: idolData[this.props.idol].color,
      padding: "10px",
      margin: "10px"
    }

    return (
      <div class="unitView" id={this.props.idol} style={style}>
        <div class="deleteButton" onClick={()=>this.props.toggleClickHandler(this.props.idol)}></div>
        <div class="unitIdol">
          <img alt={this.props.idol} height="80%" src={`https://millionlive.idolmaster.jp/theaterdays/images/top/a/${idolData[this.props.idol].image}`} />
          <h3>{this.props.idol}</h3>
        </div>
        <div class="unitList">
          {units}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listIdols: Object.keys(idoltounit),
      selectedIdols: [],
    }
  }

  toggleIdol(idol) {
    if ( this.state.selectedIdols.indexOf(idol) === -1 ){
      const selected = this.state.selectedIdols.slice()
      selected.push(idol)
      const id_name = `#${idol}`
      this.setState({ selectedIdols: selected }, 
        ()=> {
          window.location.hash="";
          window.location.hash=id_name;
          return false;
        }
      );
    } else {
      const selected = this.state.selectedIdols.filter(v=>v!==idol)
      this.setState({ selectedIdols: selected });
    }
  }

  render() {
    const idols = [];
    for(const i of this.state.selectedIdols){
      idols.push(
        <IdolItem
          key={i}
          idol={i}
          toggleClickHandler={(idol)=>this.toggleIdol(idol)}
        />
      );
    }

    return (
      <div class="container">
        <IdolsSelect
          idols={this.state.listIdols}
          onClickHandler={(idol)=>this.toggleIdol(idol)}
        />
        {idols}
      </div>
    );
  }
}

export default App;
