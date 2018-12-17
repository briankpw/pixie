import * as _ from 'underscore';

function asArray(input: any) {
  if (typeof input === 'undefined') {
    return [];
  } else if (isArray(input)) {
    return input;
  }
  return [input];
}

function isArray(variable: any) {
  return _.isArray(variable);
}

function isNumber(str: any) {
  return /^\d+$/.test(str);
}

function replaceAll(formula: string, search: string, replacement: any) {
  var target = formula;
  return target.split(search).join(replacement);
}

export { asArray as AsArray, replaceAll as ReplaceAll, isNumber as IsNumber };
