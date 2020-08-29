import React, { useState } from 'react';
import IdolsSelect from './component/IdolsSelect';
import UnitItem from './component/UnitItem';
import './css/App.css';
import './css/App.icon.css';
import './css/App.small.css';
import './css/idolIcon.css';
import './css/App.color.css';
import unitToIdol  from "./data/unitToIdol.json";
import idolToUnit  from "./data/idolToUnit.json";
import unitName    from "./data/unitName.json";

const App = () => {
  const listIdols = Object.keys(idolToUnit);

  const [selectedIdols, setSelectedIdols] = useState([]);
  const [selectedUnits, setselectedUnits] = useState([]);
  const [classNameSuffix, setClassNameSuffix] = useState("");

  const updateSelectedUnits = (idols) => {
    const selectedUnits = [];
    for(const idol of idols) {
      for(const unit of idolToUnit[idol]) {
        if(selectedUnits.indexOf(unit) === -1) {
          selectedUnits.push(unit);
        }
      }
    }
    var unitSortIndex = selectedUnits.map((u, index) => {
      var match = 0;
      var score = 0;
      unitToIdol[unitName[u]].map((i) => {
        //ユニットメンバー1人につき1点
        score += 1;
        //選択済みメンバー1人につき100点
        if(idols.indexOf(i) !== -1) {
          match ++;
          score += 100;
        }
        return null;
      });
      //ユニットメンバー全員選択済みなら10000点
      if(unitToIdol[unitName[u]].length === match) {
        score += 10000;
      }
      return {name: unitName[u], index: index, score: score};
    });
    unitSortIndex.sort((a, b) => { return (a.score > b.score) ? -1 : 1; });
    console.log(unitSortIndex);
    return unitSortIndex.map((e) => {
      return selectedUnits[e.index];
    });
  };
  
  const toggleIdol = (idol) => {
    if(selectedIdols.indexOf(idol) === -1) {
      const selected = selectedIdols.slice();
      selected.push(idol);
      const units = updateSelectedUnits(selected);
      setSelectedIdols(selected);
      setselectedUnits(units);
    } else {
      const selected = selectedIdols.filter(v => v !== idol);
      const units = updateSelectedUnits(selected);
      setSelectedIdols(selected);
      setselectedUnits(units);
    }
  };

  const addRandomIdol = () => {
    if(selectedIdols.length === listIdols.length) {
      return null;
    }
    const notSelectedIdols = listIdols.filter(v=>selectedIdols.indexOf(v)===-1);
    toggleIdol(notSelectedIdols[Math.floor(Math.random()*notSelectedIdols.length)]);
  };

  const units = [];
  for(const i of selectedUnits){
    units.push(
      <UnitItem
        key={i}
        unit={i}
        selectedIdols={selectedIdols}
        classNameSuffix={classNameSuffix}
        toggleClickHandler={(idol) => toggleIdol(idol)}
      />
    );
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header-view">
            <div className="header-title-view">
              <h3 className="header-title-box">
              MILLIONLIVE!-UNIT-SEARCH
              </h3>
            </div>
          <div className="header-menu-view">
          </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="container">
          <div className="refine-view">
            <form>
              <label>
                <div
                  className="changestyle-box"
                  onClick={() => { setClassNameSuffix(""); }}
                >
                  <div
                    className="changestyle-name-box"
                  >
                    <input type="radio" name="styles" />
                      Normal
                  </div>
                </div>
              </label>
              <label>
                <div
                  className="changestyle-box"
                  onClick={() => { setClassNameSuffix("-small"); }}
                >
                  <div
                    className="changestyle-name-box"
                  >
                    <input type="radio" name="styles" />
                    Small
                  </div>
                </div>
              </label>
              <label>
                <div
                  className="changestyle-box"
                  onClick={() => { setClassNameSuffix("-icon"); }}
                >
                  <div
                    className="changestyle-name-box"
                  >
                    <input type="radio" name="styles" />
                    Icon
                  </div>
                </div>
              </label>
            </form>
          </div>
          <button onClick={()=>addRandomIdol()} >ランダムに選択</button>
          <IdolsSelect
            idols={listIdols}
            selectedIdols={selectedIdols}
            classNameSuffix={classNameSuffix}
            onClickHandler={(idol) => toggleIdol(idol)}
          />
          <div className="unit-view">
            <div className={`unitList${classNameSuffix}`}>
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
            <p><a href="https://github.com/yukinko-tea-room/milli-uni" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            <p>The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.</p>
          </center>
        </div>
      </div>
    </div>
  );
};

export default App;
