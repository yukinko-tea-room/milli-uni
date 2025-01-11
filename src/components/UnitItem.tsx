import React from "react"
import { unitToIdol, unitNormalize, UnitName, IdolName } from "../data/index";
import IdolButton from "./IdolButton";

type Props = {
  unit: UnitName
  selectedIdols: IdolName[]
  classNameSuffix: string
  onClickHandler: (i: IdolName) => void
}

function UnitItem(props: Props) {
  const unitMember = unitToIdol[unitNormalize[props.unit]]
  // unitMember.sort((a, b)=> (props.selectedIdols.includes(b) ? 1 : -1))

  const memberButtons = unitMember.map((member, i) => {
    return (
      <IdolButton
        key={i}
        selectedIdols={props.selectedIdols}
        idolName={member}
        classNameSuffix={props.classNameSuffix}
        onClickHandler={(idol) => props.onClickHandler(idol)}
      />
    )
  });

  const selectedMember = unitMember.filter(idol => props.selectedIdols.includes(idol))
  const completeClassName = (selectedMember.length === unitMember.length) ? "unitComplete" : ""

  return (
    <div key={props.unit} className={`unitTable${props.classNameSuffix} ${completeClassName}`}>
      <div className={`unitNameView${props.classNameSuffix}`}>
        <div className={`unitNameBox${props.classNameSuffix}`}>
          {unitNormalize[props.unit]}
        </div>
      </div>
      <div className="unitIdolView">
        {memberButtons}
      </div>
    </div>
  )
}

export default UnitItem;
