"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const math = require("mathjs");
const tool_1 = require("../util/tool");
function parseMeasurement(d, index, measurement) {
    let value = d[measurement.row];
    let name = 'y';
    try {
        if (measurement.defaultValue !== undefined) {
            value = measurement.defaultValue;
        }
        else if (measurement.isIncremental) {
            value = index;
        }
        else if (measurement.formula !== undefined) {
            value = Calculating(d, measurement.formula);
        }
        else {
            value = parseFloat(value.toString());
        }
    }
    catch (e) {
        value = 0;
    }
    if (measurement.rename !== undefined) {
        name = measurement.rename;
    }
    return {
        type: true,
        name: name,
        value: value,
        float: measurement.float
    };
}
exports.parseMeasurement = parseMeasurement;
function Calculating(d, formula) {
    const splitPattern = /[\s()*/%+-]+/g;
    let formulaWithValue = formula;
    const formulaKey = formula.split(splitPattern);
    _.chain(formulaKey)
        .compact()
        .each(key => {
        if (!tool_1.IsNumber(key)) {
            formulaWithValue = tool_1.ReplaceAll(formulaWithValue, key, d[key]);
        }
    });
    return math.eval(formulaWithValue);
}
