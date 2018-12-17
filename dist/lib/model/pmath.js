"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var math = require("mathjs");
var tool_1 = require("../util/tool");
var PMATH;
(function (PMATH) {
    PMATH[PMATH["NONE"] = 0] = "NONE";
    PMATH[PMATH["SUM"] = 1] = "SUM";
    PMATH[PMATH["SUBTRACT"] = 2] = "SUBTRACT";
    PMATH[PMATH["MULTIPLE"] = 3] = "MULTIPLE";
    PMATH[PMATH["DIVIDE"] = 4] = "DIVIDE";
})(PMATH = exports.PMATH || (exports.PMATH = {}));
var PMath = /** @class */ (function () {
    function PMath(key, pMath, isPackageStartEnd) {
        this.key = key;
        this.pMath = pMath;
        this.isPackageStartEnd = isPackageStartEnd;
    }
    return PMath;
}());
exports.PMath = PMath;
function CalculatingPMath(type, value, lastCount) {
    switch (type) {
        case PMATH.NONE:
            return lastCount;
        case PMATH.SUM:
            return lastCount + value;
        case PMATH.SUBTRACT:
            return lastCount - value;
        case PMATH.MULTIPLE:
            return lastCount * value;
        case PMATH.DIVIDE:
            return lastCount / value;
    }
}
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
