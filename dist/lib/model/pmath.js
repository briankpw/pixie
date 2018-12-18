"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var math = require("mathjs");
var tool_1 = require("../util/tool");
function Calculating(d, formula) {
    var splitPattern = /[\s()*/%+-]+/g;
    var formulaWithValue = formula;
    var formulaKey = formula.split(splitPattern);
    _.chain(formulaKey)
        .compact()
        .each(function (key) {
        if (!tool_1.IsNumber(key)) {
            formulaWithValue = tool_1.ReplaceAll(formulaWithValue, key, d[key]);
        }
    });
    return math.eval(formulaWithValue);
}
exports.Calculating = Calculating;
