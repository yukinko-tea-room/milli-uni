import React from 'react';
import './App.css';
import './idolIcon.css';

import unittoidol  from './unit-to-idol.json';
import idoltounit  from './idol-to-unit.json';
import idolData from './idolData.json'

class IdolButton extends React.Component {
  render() {
    var style = {
      borderColor: idolData[this.props.idol].color,
    }
    if(this.props.selectedIdols.indexOf(this.props.idol) !== -1){
      style['backgroundColor'] = idolData[this.props.idol].color
    }

    return (
      <div
        className={"idolBox"}
        id={this.props.idol}
        style={style}
        onClick={
          ()=>{
            this.props.onClickHandler(this.props.idol);
          }
        }
      >
        <div className="boxContainer">
          <div className={`idolImage idolIcon-${this.props.idol}`}></div>
          <div className="idolNameBox">{this.props.idol}</div>
        </div>
      </div>
    );
  }
}

class IdolsSelect extends React.Component {
  render() {
    const buttons = this.props.idols.map((idol, index) => {
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
        {buttons}
      </div>
      
    );
  }
}

class IdolItem extends React.Component {
  render(){
    const units = idoltounit[this.props.idol].map((unit, i) => {
      const unit_member = unittoidol[unit].map((member, i) => {
        return(
          <IdolButton
            key={i}
            selectedIdols={this.props.selectedIdols}
            idol={member}
            onClickHandler={(idol)=>this.props.toggleClickHandler(idol)}
          />
        );
      });
      return (
        <div key={unit} className="unitTable">
          <div className="unitName checked">
            {unit}
          </div>
          <div className="unitIdolView">
            {unit_member}
          </div>
        </div>
      );
    });

    return (
      <div className="unitBox">
        <div className="unitList">
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
      selected.push(idol);
      this.setState({ selectedIdols: selected });
    } else {
      const selected = this.state.selectedIdols.filter(v=>v!==idol)
      this.setState({ selectedIdols: selected });
    }
  }

  render() {
    const units = [];
    for(const i of this.state.selectedIdols){
      units.push(
        <IdolItem
          key={i}
          idol={i}
          selectedIdols={this.state.selectedIdols}
          toggleClickHandler={(idol)=>this.toggleIdol(idol)}
        />
      );
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
              {units}
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <hr />
            <center>
					  < p>The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.</p>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
