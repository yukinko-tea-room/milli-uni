import { idolData, IdolName } from "../data/index"

type Props = {
  idolName: IdolName
  selectedIdols: IdolName[]
  classNameSuffix: string
  onClickHandler: (i: IdolName) => void
}

function IdolButton(props: Props) {
  const isSelected = props.selectedIdols.includes(props.idolName)

  let style = {
    borderColor: idolData[props.idolName].color,
    backgroundColor: isSelected ? idolData[props.idolName].color : undefined
  }

  return (
    <div
      className={`idolBox${props.classNameSuffix}`}
      id={props.idolName}
      style={style} onClick={()=>{
        props.onClickHandler(props.idolName);
      }}
    >
      <div className="boxContainer">
        <div className={`idolImage${props.classNameSuffix} idolIcon-${props.idolName}`}></div>
        <div className={`idolNameBox${props.classNameSuffix}`}>
          {idolData[props.idolName].screenName}
        </div>
      </div>
    </div>
  )
}

export default IdolButton
