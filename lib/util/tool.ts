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

export { asArray as AsArray };
