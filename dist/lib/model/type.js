"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition_1 = require("../model/condition");
var TYPE;
(function (TYPE) {
    TYPE[TYPE["ANY"] = 0] = "ANY";
    TYPE[TYPE["NUMBER"] = 1] = "NUMBER";
    TYPE[TYPE["DOUBLE"] = 2] = "DOUBLE";
    TYPE[TYPE["STRING"] = 3] = "STRING";
    TYPE[TYPE["DATE"] = 4] = "DATE";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
class Measurement {
    constructor(row, condition, dimensionListBind = false, float, formula, rename, defaultValue, isIncremental = false) {
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
}
exports.Measurement = Measurement;
class Dimension {
    constructor(column, category, rename, defaultValue, isIncremental = false) {
        this.column = column;
        this.category = category;
        this.rename = rename;
        this.defaultValue = defaultValue;
        this.isIncremental = isIncremental;
    }
}
exports.Dimension = Dimension;
