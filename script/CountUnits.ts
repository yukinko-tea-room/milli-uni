import Data from "../src/unitToIdol.json" assert { type: "json" };

type UnitToIdols = {
  [unitName: string]: string[]
}

let array = [0, 0, 0, 0, 0]

Object.keys(Data).forEach(unitName => {
  const members: string[] = Data[unitName];
  array[members.length - 2]++;
})

console.log(array)
