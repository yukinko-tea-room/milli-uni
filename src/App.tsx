import React, { useState } from 'react';
import './styles/App.css';
import './styles/App.icon.css';
import './styles/App.small.css';
import './styles/idolIcon.css';
import './styles/App.color.css';

import { idolData, unitToIdol, idolToUnit, unitNormalize } from './data'

import IdolsSelect from './components/IdolsSelect';
import UnitItem from './components/UnitItem';
import Header from './components/Header';
import Footer from './components/Footer';
import { IdolName, UnitName } from './data';

type ClassNameSuffix = 'Small' | 'Icon' | ''

function App() {
  const listIdols = Object.keys(idolData) as IdolName[]
  const [selectedIdols, setSelectedIdols] = useState<IdolName[]>([])
  // const [selectedUnits, setSelectedUnits] = useState<UnitName[]>([])
  const [classNameSuffix, setClassNameSuffix] = useState<ClassNameSuffix>('')

  const selectedUnits = Array.from(new Set(selectedIdols.flatMap(idol => idolToUnit[idol])))
  function setSelectedUnits(units: UnitName[]) {} // dummy

  function updateSelectedUnits(idols: IdolName[]) {
    const selectedUnits: UnitName[] = []

    var unitSortIndex = selectedUnits.map((u, index) => {
      var match = 0
      var score = 0
      unitToIdol[unitNormalize[u]].map((i) => {
        //ユニットメンバー1人につき1点
        score += 1
        //選択済みメンバー1人につき100点
        if (idols.indexOf(i) !== -1) {
          match++
          score += 100
        }
        return null
      })
      //ユニットメンバー全員選択済みなら10000点
      if (unitToIdol[unitNormalize[u]].length === match) {
        score += 10000
      }
      return { name: unitNormalize[u], index: index, score: score }
    })
    unitSortIndex.sort((a, b) => { return (a.score > b.score) ? -1 : 1 })
    console.log(unitSortIndex)
    return unitSortIndex.map((e) => {
      return selectedUnits[e.index]
    })
  }

  function toggleIdol(idol: IdolName) {
    if (!selectedIdols.includes(idol)) {
      const selected = selectedIdols.concat(idol)
      const units = updateSelectedUnits(selected)
      setSelectedIdols(selected)
      setSelectedUnits(units)
    } else {
      const selected = selectedIdols.filter(v => v !== idol);
      const units = updateSelectedUnits(selected)
      setSelectedIdols(selected)
      setSelectedUnits(units)
    }
  }

  function addRandomIdol() {
    if (selectedIdols.length === listIdols.length) return // 全てのアイドルを選択していた場合、何もしない

    const notSelectedIdols = listIdols.filter(v => !selectedIdols.includes(v))
    toggleIdol(notSelectedIdols[Math.floor(Math.random() * notSelectedIdols.length)])
  }

  const units = [];
  for (const i of selectedUnits) {
    units.push(
      <UnitItem
        key={i}
        unit={i}
        selectedIdols={selectedIdols}
        classNameSuffix={classNameSuffix}
        onClickHandler={(idol: IdolName) => toggleIdol(idol)}
      />
    )
  }

  return (
    <div>
      <Header />
      <div className="main">
        <div className="container">
          <div className="refineView">
            <form>
              <label>
                <div className="changestyleBox" onClick={() => { setClassNameSuffix("") }}>
                  <div className="changestyleNameBox">
                    <input type="radio" name="styles" /> Normal
                  </div>
                </div>
              </label>
              <label>
                <div className="changestyleBox" onClick={() => { setClassNameSuffix("Small") }}>
                  <div className="changestyleNameBox">
                    <input type="radio" name="styles" /> Small
                  </div>
                </div>
              </label>
              <label>
                <div className="changestyleBox" onClick={() => { setClassNameSuffix("Icon") }}>
                  <div className="changestyleNameBox">
                    <input type="radio" name="styles" /> Icon
                  </div>
                </div>
              </label>
            </form>
          </div>
          <button onClick={() => addRandomIdol()} >ランダムに選択</button>
          <IdolsSelect
            idols={listIdols}
            selectedIdols={selectedIdols}
            classNameSuffix={classNameSuffix}
            onClickHandler={(idol) => toggleIdol(idol)}
          />
          <div className="unitView">
            <div className={`unitList${classNameSuffix}`}>
              {units}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App
