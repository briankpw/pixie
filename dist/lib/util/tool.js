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
