import React from 'react';

import unittoidol  from './unit-to-idol.json';
import idoltounit  from './idol-to-unit.json';
import idolData from './idolData.json'

class IdolButton extends React.Component {
  render() {
    const style = {
        backgroundColor: idolData[this.props.idol].color,
        width: "110px",
        height: "40px",
        padding: "10px" 
    }
    return (
      <button
        class="idol-button"
        style={style}
        onClick={()=>this.props.onClickHandler(this.props.idol)}
      >
        {this.props.idol}
      </button>
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
      <div>
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
          <IdolButton key={i} idol={member} onClickHandler={(idol)=>this.props.addClickHandler(idol)} />
        );
      });
      return (
        <tr key={i}>
          <td>{unit}</td>
          <td>{unit_member}</td>
        </tr>
      );
    });

    const style = {
        backgroundColor: idolData[this.props.idol].color,
        height: "40px"
    }

    return (
      <div>
        <div>
          <h3 style={style}>{this.props.idol}</h3>
          <button onClick={()=>this.props.deleteClickHandler(this.props.idol)}>削除</button>
        </div>
        <div>
          <table border="1"><tbody>{units}</tbody></table>
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

  addIdolToList(idol) {
    if ( this.state.selectedIdols.indexOf(idol) === -1 ){
      const selected = this.state.selectedIdols.slice()
      selected.push(idol)
      const list = this.state.listIdols.filter(v=>v !== idol)
      this.setState({ selectedIdols: selected, listIdols: list });
    }
  }

  deleteIdolFromList(idol) {
    const selected = this.state.selectedIdols.filter(v=>v!==idol)
    const list = Object.keys(idoltounit).filter(v=>selected.indexOf(v)<0)
    this.setState({ selectedIdols: selected, listIdols: list });
  }

  render() {
    const idols = [];
    for(const i of this.state.selectedIdols){
      idols.push(
        <IdolItem
          key={i}
          idol={i}
          addClickHandler={(idol)=>this.addIdolToList(idol)}
          deleteClickHandler={(idol)=>this.deleteIdolFromList(idol)}
        />
      );
    }

    return (
      <div>
        {idols}
        <IdolsSelect
          idols={this.state.listIdols}
          onClickHandler={(idol)=>this.addIdolToList(idol)}
        />
      </div>
    );
  }
}

export default App;
