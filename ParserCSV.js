/*
This class parses a CSV file.
*/
class ParserCSV {
  constructor (quote = '"', value_delimiter = ',', line_delimiter = "\n") {
    let value_regex_string = `(${quote}([^${quote}]|${quote}${quote})*${quote}|[^${quote}${value_delimiter}${line_delimiter}]*)`;
    this.regex_line = new RegExp('((' + value_regex_string + value_delimiter + ')*' + value_regex_string + '+|(' + value_regex_string + value_delimiter + ')+' + value_regex_string + ')', "gm");
    this.regex_value = new RegExp(`((${quote}([^${quote}]|${quote}${quote})*${quote}|[^${quote}${value_delimiter}${line_delimiter}]+)|${value_delimiter})`, "gm");
  }

  /*
  This function parses a CSV file.
  */
  parse(data) {
    let lines = data.matchAll(this.regex_line);

    let arrays = [];
    let array = [];

    for (let line of lines) {
      let text_line = line[0];
      if (text_line) {
        this.parse_line(text_line, array);
        arrays.push(array);
        array = [];
      }
    }

    if (array.length) {
      arrays.push(array);
    }

    return arrays;
  }

  /*
  This function parses a CSV line.
  */
  parse_line(line, array) {
    let values = line.matchAll(this.regex_value);
    let not_empty = false;

    for (let value of values) {
      let data = value[0];

      if (data === ",") {
        if (!not_empty) {
          array.push("");
        }
        not_empty = false;
        continue;
      }

      not_empty = true;
      this.parse_value(data, array);
    }

    if (!not_empty) {
      array.push("");
    }
  }

  /*
  This function parses a CSV value.
  */
  parse_value (data, array) {
    if (data[0] === '"') {
      array.push(data.substring(1, data.length - 1).replace('""', '"'));
    } else {
      array.push(data);
    }
  }
}

/*
This function tests the CSV Parser.
*/
function test() {
  let csv = new ParserCSV('"', ',', '\r\n');
  return csv.parse('"""\n,""","abc\ndef,""",abc\r\n"""\n,""","abc\ndef,""",abc\r\n,,');
}
