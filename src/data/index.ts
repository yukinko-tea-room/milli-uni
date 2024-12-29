import idolDataRaw from './idolData.json'
import unitToIdolRaw from './unitToIdol.json'
import idolToUnitRaw from './idolToUnit.json'
import unitNormalizeRaw from './unitNormalize.json'

export type IdolName = keyof typeof idolDataRaw
export type UnitName = keyof typeof unitToIdolRaw

export type IdolType = "princess" | "fairy" | "angel"

export type IdolDatum = {
    screenName: string
    color: string
    type: IdolType
  }

export type IdolData = {
  [key in IdolName]: IdolDatum
}

export type UnitToIdol = {
  [key in UnitName]: IdolName[]
}

export type IdolToUnit = {
  [key in IdolName]: UnitName[]
}

export type UnitNormalize = {
  [key: string]: UnitName
}

export const idolData: IdolData = idolDataRaw as IdolData
export const unitToIdol: UnitToIdol = unitToIdolRaw as UnitToIdol
export const idolToUnit: IdolToUnit = idolToUnitRaw as IdolToUnit
export const unitNormalize: UnitNormalize = unitNormalizeRaw as UnitNormalize
