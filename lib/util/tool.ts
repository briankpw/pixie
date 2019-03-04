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

function deepClone(obj:any):any {
  return !obj || typeof obj !== 'object'
    ? obj
    : _.isString(obj)
    ? String.prototype.slice.call(obj)
    : _.isDate(obj)
    ? new Date(obj.valueOf())
    : _.isFunction(obj.clone)
    ? obj.clone()
    : _.isArray(obj)
    ? _.map(obj, function(t) {
        return deepClone(t);
      })
    : _.mapObject(obj, function(val, key) {
        return deepClone(val);
      });
}

export { asArray as AsArray, replaceAll as ReplaceAll, isNumber as IsNumber, deepClone as DeepClone };
