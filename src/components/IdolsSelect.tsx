import { useState } from "react"
import { idolData, IdolName, IdolType } from "../data"
import IdolButton from "./IdolButton"

type Props = {
  idols: IdolName[]
  selectedIdols: IdolName[]
  classNameSuffix: string
  onClickHandler: (i: IdolName) => void
}

type FilterType = IdolType | 'selecting'

function IdolsSelect(props: Props) {
  const [filterTypes, setFilterTypes] = useState<FilterType[]>(['princess', 'fairy', "angel"])

  function toggleFilter(type: FilterType) {
    if (filterTypes.includes(type)) {
      setFilterTypes((types) => types.filter(t => t !== type))
    } else {
      setFilterTypes((types) => types.concat(type))
    }
  }

  function filterButtonBuilder(type: FilterType) {
    return (
      <label>
        <div
          className={`filterCheckboxType filterCheckbox-${type} ${filterTypes.includes(type) ? "checked" : ""}`}
        >
          <div className="typeNameBox">
            <input
              type="checkbox"
              checked={(filterTypes.includes(type))}
              onChange={() => toggleFilter(type)}
            />
            {type}
          </div>
        </div>
      </label>
    )
  }

  const buttons = props.idols.map((idol, index) => {
    if(filterTypes.indexOf(idolData[idol].type) === -1){
      if(filterTypes.indexOf("selecting") === -1 ||
         props.selectedIdols.indexOf(idol) === -1){
        return null
      }
    }

    return(
      <IdolButton
        key={index}
        selectedIdols={props.selectedIdols}
        idolName={idol}
        classNameSuffix={props.classNameSuffix}
        onClickHandler={(idol) => props.onClickHandler(idol)}
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
  )
}

export default IdolsSelect
