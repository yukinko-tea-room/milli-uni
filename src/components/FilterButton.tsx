import { FilterType } from "./IdolsSelect"

type Props = {
  type: FilterType
  isIncluded: boolean
  toggleFilter: (f: FilterType) => void
}

function FilterButton(props: Props) {
  return (
    <label>
      <div
        className={`filterCheckboxType filterCheckbox-${props.type} ${props.isIncluded ? "checked" : ""}`}
      >
        <div className="typeNameBox">
          <input
            type="checkbox"
            checked={props.isIncluded}
            onChange={() => props.toggleFilter(props.type)}
          />
          {props.type}
        </div>
      </div>
    </label>
  )
}

export default FilterButton
