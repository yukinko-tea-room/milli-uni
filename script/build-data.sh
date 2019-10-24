#!/usr/bin/env bash

SPREADSHEET_URL="https://docs.google.com/spreadsheets/d/1SuvJFStzTXDalw3PXHk8Cph3ewrHvYwDlKWWIRnSzfU/export"
UNIT_TO_IDOL_SHEET_ID="1100874764"
IDOL_TO_UNIT_SHEET_ID="1217692686"

wget -O unitToIdol.csv "${SPREADSHEET_URL}?format=csv&gid=${UNIT_TO_IDOL_SHEET_ID}"
wget -O idolToUnit.csv "${SPREADSHEET_URL}?format=csv&gid=${IDOL_TO_UNIT_SHEET_ID}"

./csvToJson.py
mkdir ../src/data/
cp *.json ../src/data/
