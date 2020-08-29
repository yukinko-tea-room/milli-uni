import React, { useState } from 'react';
import IdolButton from './IdolButton';
import idolData from '../masterdata/idolData.json';

const IdolsSelect = (props) => {
  const [filterTypes, setFilterTypes] = useState(["princess", "fairy", "angel"]);

  const setFilter = (type) => {
    if (filterTypes.indexOf(type) !== -1) {
      return setFilterTypes(filterTypes.filter(v => v !== type));
    } else {
      return setFilterTypes(prevArray => [...prevArray, type]);
    }
  };

  const filterButtonBuilder = (type) => {
    return (
      <label>
        <div
          className={`filter-checkbox-type filter-checkbox-${type} ${(filterTypes.indexOf(type) !== -1) ? "checked" : ""}`}
        >
          <div className="type-name-box">
            <input
              type="checkbox"
              checked={(filterTypes.indexOf(type) !== -1) ? "checked" : ""}
              onChange={() => setFilter(type)}
            />
            {type}
          </div>
        </div>
      </label>
    );
  };

  const buttons = props.idols.map((idol, index) => {
    if(filterTypes.indexOf(idolData[idol].type) === -1){
      if(filterTypes.indexOf("selecting") === -1 ||
          props.selectedIdols.indexOf(idol) === -1){
        return null;
      }
    }
    return(
      <IdolButton
        key={index}
        selectedIdols={props.selectedIdols}
        idol={idol}
        classNameSuffix={props.classNameSuffix}
        onClickHandler={(idol) => props.onClickHandler(idol)}
      />
    );
  });

  return (
    <div className="idol-view">
      <form>
        {filterButtonBuilder("princess")}
        {filterButtonBuilder("fairy")}
        {filterButtonBuilder("angel")}
        {filterButtonBuilder("selecting")}
      </form>
      {buttons}
    </div>
  );
};

export default IdolsSelect;
