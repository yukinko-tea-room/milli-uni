import React from 'react';
import IdolButton from "./IdolButton";
import unitToIdol  from "../data/unitToIdol.json";
import unitName    from "../data/unitName.json";

const UnitItem = (props) => {
  const unitMember = unitToIdol[unitName[props.unit]];

  unitMember.sort((a, b) => {
    return (props.selectedIdols.indexOf(b) !== -1) ? 1 : -1;
  });

  const memberButtons = unitMember.map((member, i) => {
    return(
      <IdolButton
        key={i}
        selectedIdols={props.selectedIdols}
        idol={member}
        classNameSuffix={props.classNameSuffix}
        onClickHandler={(idol) => props.toggleClickHandler(idol)}
      />
    );
  });

  const selectedMember = unitMember.filter(idol => props.selectedIdols.indexOf(idol) !== -1);
  const completeClassName = (selectedMember.length === unitMember.length) ? "unit-complete" : "";

  return(
    <div key={props.unit} className={`unit-table${props.classNameSuffix} ${completeClassName}`}>
      <div className={`unit-name-view${props.classNameSuffix}`}>
        <div className={`unit-name-box${props.classNameSuffix}`}>
          {unitName[props.unit]}
        </div>
      </div>
      <div className="unit-idol-view">
        {memberButtons}
      </div>
    </div>
  );
};

export default UnitItem;
