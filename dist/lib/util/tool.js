"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
function asArray(input) {
    if (typeof input === 'undefined') {
        return [];
    }
    else if (isArray(input)) {
        return input;
    }
    return [input];
}
exports.AsArray = asArray;
function isArray(variable) {
    return _.isArray(variable);
}
function isNumber(str) {
    return /^\d+$/.test(str);
}
exports.IsNumber = isNumber;
function replaceAll(formula, search, replacement) {
    var target = formula;
    return target.split(search).join(replacement);
}
exports.ReplaceAll = replaceAll;
function deepClone(obj) {
    return !obj || typeof obj !== 'object'
        ? obj
        : _.isString(obj)
            ? String.prototype.slice.call(obj)
            : _.isDate(obj)
                ? new Date(obj.valueOf())
                : _.isFunction(obj.clone)
                    ? obj.clone()
                    : _.isArray(obj)
                        ? _.map(obj, function (t) {
                            return deepClone(t);
                        })
                        : _.mapObject(obj, function (val, key) {
                            return deepClone(val);
                        });
}
exports.DeepClone = deepClone;
function chunkObj(object, size) {
    var values = _.values(object);
    var final = [];
    var counter = 0;
    var portion = {};
    for (var key in object) {
        if (counter !== 0 && counter % size === 0) {
            final.push(portion);
            portion = {};
        }
        portion[key] = values[counter];
        counter++;
    }
    final.push(portion);
    return final;
}
