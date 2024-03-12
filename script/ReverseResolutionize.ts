// This script generates idolToUnit.json from unitToIdol.json like inverse mapping.
// Use deno because this depending Deno API.
// Usage: deno run <path of this script>

import Data from "./unitToIdol.json" assert { type: "json" };

type UnitToIdols = {
  [unitName: string]: string[]
}

type IdolToUnits = {
  [idolName: string]: string[]
}

let result = {} as IdolToUnits

Object.keys(Data as UnitToIdols).forEach(unitName => {
  Data[unitName].forEach(idolName => {
    if(result[idolName]) {
      result[idolName].push(unitName)
    } else {
      result[idolName] = [unitName]
    }
  });
})

Deno.writeTextFile("idolToUnit.json", JSON.stringify(result));
// console.log(result)
