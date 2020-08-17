import React, { useState } from 'react';
import './css/App.css';
import './css/App.icon.css';
import './css/App.small.css';
import './css/App.color.css';
import './css/idolIcon.css';

import unitToIdol  from "./data/unitToIdol.json";
import idolToUnit  from "./data/idolToUnit.json";
import unitName    from "./data/unitName.json"
import idolData from "./masterdata/idolData.json";

const IdolButton = (props) => {
  var style = {
      borderColor: idolData[props.idol].color
  }
  if(props.selectedIdols.indexOf(props.idol) !== -1){
    style["backgroundColor"] = idolData[props.idol].color
  }

  return (
    <div
      className={`idolBox${props.classNameSuffix}`}
      id={props.idol}
      style={style} onClick={()=>{
        props.onClickHandler(props.idol);
      }}
    >
      <div className="boxContainer">
        <div className={`idolImage${props.classNameSuffix} idolIcon-${props.idol}`}></div>
        <div className={`idolNameBox${props.classNameSuffix}`}>
          {idolData[props.idol].screenName}
        </div>
      </div>
    </div>
  );
}

const IdolsSelect = (props) =>  {
  const [filterType, setFilterType] = useState(["princess", "fairy", "angel"])

  const setFilter = (type) => {
    if(filterType.indexOf(type) !== -1){
      const ft = filterType.filter(v=>v!==type)
      setFilterType(ft)
    }else{
      const ft = filterType.slice()
      ft.push(type)
      setFilterType(ft)
    }
  }
  
  const filterButtonBuilder = (type) => {
    return(
      <label>
        <div
          className={`filterCheckboxType filterCheckbox-${type} ${(filterType.indexOf(type)!==-1)?"checked":""}`}
        >
          <div className="typeNameBox">
            <input
              type="checkbox"
              checked={(filterType.indexOf(type)!==-1)?"checked":""}
              onChange={()=>setFilter(type)}
            />
            {type}
          </div>
        </div>
      </label>
    )
  }

  const buttons = props.idols.map((idol, index) => {
    if(filterType.indexOf(idolData[idol].type) === -1){
      if(filterType.indexOf("selecting") === -1 ||
         props.selectedIdols.indexOf(idol) === -1){
        return null
      }
    }
    return(
      <IdolButton
        key={index}
        selectedIdols={props.selectedIdols}
        idol={idol}
        classNameSuffix={props.classNameSuffix}
        onClickHandler={(idol)=>props.onClickHandler(idol)}
      />
    );
  });

  return (
    <div className="idolView">
      <form>
        {filterButtonBuilder("princess")}
        {filterButtonBuilder("fairy")}
        {filterButtonBuilder("angel")}
        {filterButtonBuilder("selecting")}
      </form>
      {buttons}
    </div>
  );
}

const UnitItem = (props) =>  {
    const unitMember = unitToIdol[unitName[props.unit]]
    unitMember.sort((a,b)=>{
      return (props.selectedIdols.indexOf(b)!==-1)?1:-1
    })
    const memberButtons = unitMember.map((member, i) => {
      return(
        <IdolButton
          key={i}
          selectedIdols={props.selectedIdols}
          idol={member}
          classNameSuffix={props.classNameSuffix}
          onClickHandler={(idol)=>props.toggleClickHandler(idol)}
        />
      )
    });
    const selectedMember = unitMember.filter(idol=>props.selectedIdols.indexOf(idol)!==-1)
    const completeClassName = (selectedMember.length === unitMember.length)?"unitComplete":""

    return(
      <div key={props.unit} className={`unitTable${props.classNameSuffix} ${completeClassName}`}>
        <div className={`unitNameView${props.classNameSuffix}`}>
          <div className={`unitNameBox${props.classNameSuffix}`}>
            {unitName[props.unit]}
          </div>
        </div>
        <div className="unitIdolView">
          {memberButtons}
        </div>
      </div>
    )
}

const App = () => {
  const [listIdols, setListIdols] = useState(Object.keys(idolToUnit))
  const [selectedIdols, setSelectedIdols] = useState([])
  const [selectedUnits, setSelectedUnits] = useState([])
  const [classNameSuffix, setClassNameSuffix] = useState("")

  const updateSelectedUnits = (idols) => {
    const sdUnits = []
    for(const idol of idols){
      for(const unit of idolToUnit[idol]){
        if(sdUnits.indexOf(unit) === -1){
          sdUnits.push(unit)
        }
      }
    }
    var unitSortIndex = sdUnits.map((u,index)=>{
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
      return sdUnits[e.index]
    })
  }
  
  const toggleIdol = (idol) => {
    if ( selectedIdols.indexOf(idol) === -1 ){
      const selected = selectedIdols.slice()
      selected.push(idol);
      const units = updateSelectedUnits(selected)
      setSelectedIdols(selected)
      setSelectedUnits(units)
    } else {
      const selected = selectedIdols.filter(v=>v!==idol);
      const units = updateSelectedUnits(selected)
      setSelectedIdols(selected)
      setSelectedUnits(units)
    }
  }

  const addRandomIdol = () => {
    if (selectedIdols.length === listIdols.length){
      return null
    }
    const notSelectedIdols = listIdols.filter(v=>selectedIdols.indexOf(v)===-1)
    toggleIdol(notSelectedIdols[Math.floor(Math.random()*notSelectedIdols.length)])
  }

  const units = [];
  for(const i of selectedUnits){
    units.push(
      <UnitItem
        key={i}
        unit={i}
        selectedIdols={selectedIdols}
        classNameSuffix={classNameSuffix}
        toggleClickHandler={(idol)=>toggleIdol(idol)}
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
                  onClick={()=>{setClassNameSuffix("")}}
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
                  onClick={()=>{setClassNameSuffix("Small")}}
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
                  onClick={()=>{setClassNameSuffix("Icon")}}
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
          <button onClick={()=>addRandomIdol()} >ランダムに選択</button>
          <IdolsSelect
            idols={listIdols}
            selectedIdols={selectedIdols}
            classNameSuffix={classNameSuffix}
            onClickHandler={(idol)=>toggleIdol(idol)}
          />
          <div className="unitView">
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
            <p>株式会社バンダイナムコゲームスさま、またはその他の関連各社さまとは、一切関係ありません。</p>
          </center>
        </div>
      </div>
    </div>
  );
  
}

export default App;
