import React from 'react';

import unittoidol  from './unit-to-idol.json';
import idoltounit  from './idol-to-unit.json';

class IdolButton extends React.Component {
  render() {
    return (
      <button
        onClick={()=>this.props.onClickHandler(this.props.idol)}
      >
        {this.props.idol}
      </button>
    );
  }
}

class IdolsSelect extends React.Component {
  render() {
    const buttons = this.props.idols.map((idol) => {
      return(
        <IdolButton idol={idol} onClickHandler={(i)=>this.props.onClickHandler(i)}/>
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
    const units = idoltounit[this.props.idol].map((unit) => {
      const unit_member = unittoidol[unit].filter(x => x!==this.props.idol).map((member) => {
        return(
          <IdolButton idol={member} onClickHandler={(idol)=>this.props.addClickHandler(idol)} />
        );
      });
      return (
        <tr>
          <td>{unit}</td>
          <td>{unit_member}</td>
        </tr>
      );
    });

    return (
      <div>
        <div>
          <h3>{this.props.idol}</h3>
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
