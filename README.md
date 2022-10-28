# JavascriptParserCSV

## Description

This project implements a one-file CSV parser, based on RegExp, that is easy to install and use in any project.

## Requirements

**There is no requirements for this project**.

## Installation

Download the `ParserCSV.js` file on your Web Server and call it

## Usages

```js
let csv = new ParserCSV();
arrayOfarrays = csv.parse('Column1,Column2,Column3\nValue1.1,Value1.2,Value1.3\nValue2.1,Value2.2,Value3.3');

let csv = new ParserCSV('"', ',', '\r\n');
arrayOfarrays = csv.parse('"""\n,""","abc\ndef,""",abc\r\n"""\n,""","abc\ndef,""",abc\r\n,,');
```

## Licence

Licensed under the [GPL, version 3](https://www.gnu.org/licenses/).
