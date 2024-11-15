import { useState } from "react"
import { idolData, IdolName, IdolType } from "../data"
import IdolButton from "./IdolButton"
import FilterButton from "./FilterButton"

type Props = {
  idols: IdolName[]
  selectedIdols: IdolName[]
  classNameSuffix: string
  onClickHandler: (i: IdolName) => void
}

export type FilterType = IdolType | 'selecting'

function IdolsSelect(props: Props) {
  const [filterTypes, setFilterTypes] = useState<FilterType[]>(['princess', 'fairy', "angel"])

  function toggleFilter(type: FilterType) {
    if (filterTypes.includes(type)) {
      setFilterTypes((types) => types.filter(t => t !== type))
    } else {
      setFilterTypes((types) => types.concat(type))
    }
  }

  const buttons = props.idols.filter((idol) => {
    return filterTypes.includes(idolData[idol].type) || // 選んでいるタイプに含まれているか
      (filterTypes.includes('selecting') && props.selectedIdols.includes(idol)) // selectingがある際に選んでいるアイドルの場合
  }).map((idol, index) => (
    <IdolButton
      key={index}
      selectedIdols={props.selectedIdols}
      idolName={idol}
      classNameSuffix={props.classNameSuffix}
      onClickHandler={(idol) => props.onClickHandler(idol)}
    />
  ))

  return (
    <div className="idolView">
      <form>
      {
          (['princess', 'fairy', 'angel', 'selecting'] as FilterType[]).map((type) =>
            <FilterButton
              type={type}
              isIncluded={filterTypes.includes(type)}
              toggleFilter={toggleFilter}
            />
          )
        }
      </form>
      {buttons}
    </div>
  )
}

export default IdolsSelect
