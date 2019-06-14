#!/usr/bin/env bash

SPREADSHEET_URL="https://docs.google.com/spreadsheets/d/1SuvJFStzTXDalw3PXHk8Cph3ewrHvYwDlKWWIRnSzfU/export"
UNIT_TO_IDOL_SHEET_ID="1100874764"
IDOL_TO_UNIT_SHEET_ID="1217692686"

wget -O unit-to-idol.csv "${SPREADSHEET_URL}?format=csv&gid=${UNIT_TO_IDOL_SHEET_ID}"
wget -O idol-to-unit.csv "${SPREADSHEET_URL}?format=csv&gid=${IDOL_TO_UNIT_SHEET_ID}"

./csv-to-json.py
