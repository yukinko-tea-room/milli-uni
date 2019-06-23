#!/usr/bin/env python3

import csv
import json

uti_csv = open('unit-to-idol.csv', 'r')
uti_json = open('unit-to-idol.json', 'w')
unitname_json = open('unitName.json', 'w')
uti_reader = csv.reader(uti_csv)
header = next(uti_reader)
data=dict()
unitFixer=dict()
for row in uti_reader:
    unitName = [i for i in row[:3] if i != ''][0]
    for unit in [i for i in row[:3] if i != '']:
        unitFixer.update({unit: unitName})
    data.update({ unitName: [i for i in row[3:] if i != '']})


json.dump(data, uti_json, ensure_ascii=False)
json.dump(unitFixer, unitname_json, ensure_ascii=False)

uti_csv.close()
uti_json.close()

itu_csv = open('idol-to-unit.csv', 'r')
itu_json = open('idol-to-unit.json', 'w')
itu_reader = csv.reader(itu_csv)
header = next(itu_reader)
data.clear()
for row in itu_reader:
    data.update({ row[1]: [i for i in row[2:] if i != '']})

json.dump(data, itu_json, ensure_ascii=False)

itu_csv.close()
itu_json.close()
