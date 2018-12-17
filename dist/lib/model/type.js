"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = require("../model/condition");
var pmath_1 = require("../model/pmath");
var TYPE;
(function (TYPE) {
    TYPE[TYPE["ANY"] = 0] = "ANY";
    TYPE[TYPE["NUMBER"] = 1] = "NUMBER";
    TYPE[TYPE["DOUBLE"] = 2] = "DOUBLE";
    TYPE[TYPE["STRING"] = 3] = "STRING";
    TYPE[TYPE["DATE"] = 4] = "DATE";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
var Measurement = /** @class */ (function () {
    function Measurement(row, condition, dimensionListBind, float, formula, rename, defaultValue, isIncremental) {
        if (dimensionListBind === void 0) { dimensionListBind = false; }
        if (isIncremental === void 0) { isIncremental = false; }
        this.row = row;
        this.condition = condition;
        this.dimensionListBind = dimensionListBind;
        this.float = float;
        this.formula = formula;
        this.rename = rename;
        this.defaultValue = defaultValue;
        this.isIncremental = isIncremental;
        this.condition = condition_1.ConvertNoneCondition(condition);
    }
    return Measurement;
}());
exports.Measurement = Measurement;
var Dimension = /** @class */ (function () {
    function Dimension(column, category, rename, defaultValue, isIncremental) {
        if (isIncremental === void 0) { isIncremental = false; }
        this.column = column;
        this.category = category;
        this.rename = rename;
        this.defaultValue = defaultValue;
        this.isIncremental = isIncremental;
    }
    return Dimension;
}());
exports.Dimension = Dimension;
function ParseDimension(type, value, dp, index) {
    if (dp.defaultValue !== undefined) {
        value = dp.defaultValue;
    }
    else if (dp.isIncremental) {
        return index;
    }
    switch (type) {
        case TYPE.ANY:
            return value;
        case TYPE.DATE:
            return Date.parse(value);
        case TYPE.DOUBLE:
            return parseFloat(value);
        case TYPE.NUMBER:
            return parseInt(value);
        case TYPE.STRING:
            return value.toString();
    }
}
exports.ParseDimension = ParseDimension;
function ParseMeasurement(float, value, mp, index) {
    try {
        if (mp.defaultValue !== undefined) {
            value = mp.defaultValue;
        }
        else if (mp.isIncremental) {
            return index;
        }
        else {
            value = parseFloat(value.toString());
        }
    }
    catch (e) {
        return 0;
    }
    switch (float) {
        case 0:
        case null:
        case undefined:
            return value;
        default:
            return parseFloat(value.toFixed(float));
    }
}
exports.ParseMeasurement = ParseMeasurement;
function ParseMeasurementWithFormula(float, d, formula) {
    var count = 0;
    try {
        count = pmath_1.Calculating(d, formula);
    }
    catch (e) {
        return 0;
    }
    switch (float) {
        case 0:
        case null:
        case undefined:
            return count;
        default:
            return parseFloat(count.toFixed(float));
    }
}
exports.ParseMeasurementWithFormula = ParseMeasurementWithFormula;
