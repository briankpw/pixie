"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = require("../model/condition");
var pmath_1 = require("../model/pmath");
var _ = require("underscore");
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
    var packageCount = 0;
    var isPackageStartEnd = 0;
    var firstPackage;
    var nextMath;
    var breakMath;
    // 0-Normal 1=( 2=Normal Package 3=)
    _.each(formula, function (f, i) {
        if (typeof f.isPackageStartEnd === 'undefined') {
            if (isPackageStartEnd === 0) {
                isPackageStartEnd = 0;
            }
            else {
                isPackageStartEnd = 2;
            }
        }
        else if (f.isPackageStartEnd) {
            isPackageStartEnd = 1;
            breakMath = nextMath;
        }
        else {
            isPackageStartEnd = 3;
        }
        var dataCount;
        if (_.isString(f.key)) {
            dataCount = d[f.key];
        }
        else {
            dataCount = f.key;
        }
        if (i === 0) {
            // When Launch First Time
            if (isPackageStartEnd === 1) {
                packageCount = dataCount;
                firstPackage = true;
            }
            else {
                count = dataCount;
            }
            nextMath = f.pMath;
        }
        else if (isPackageStartEnd === 0) {
            // First Value Math With New Value
            count = pmath_1.Calculating(nextMath, dataCount, count);
            nextMath = f.pMath;
        }
        else if (isPackageStartEnd === 1) {
            // Bracket Started
            packageCount = dataCount;
            nextMath = f.pMath;
        }
        else if (isPackageStartEnd === 2) {
            // Bracket Continue
            packageCount = pmath_1.Calculating(nextMath, dataCount, packageCount);
            nextMath = f.pMath;
        }
        else if (isPackageStartEnd === 3) {
            // Bracket End and Count MATH Package
            packageCount = pmath_1.Calculating(nextMath, dataCount, packageCount);
            // First Times Ignore Calculations
            if (firstPackage) {
                count = packageCount;
                firstPackage = false;
            }
            else {
                count = pmath_1.Calculating(breakMath, packageCount, count);
            }
            nextMath = f.pMath;
            packageCount = 0;
            isPackageStartEnd = 0;
        }
    });
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
