"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tool_1 = require("../util/tool");
var CONDITION;
(function (CONDITION) {
    CONDITION[CONDITION["NONE"] = 0] = "NONE";
    CONDITION[CONDITION["EQUAL"] = 1] = "EQUAL";
    CONDITION[CONDITION["NOTEQUAL"] = 2] = "NOTEQUAL";
    CONDITION[CONDITION["MORETHAN"] = 3] = "MORETHAN";
    CONDITION[CONDITION["MORETHANOREQUAL"] = 4] = "MORETHANOREQUAL";
    CONDITION[CONDITION["LESSTHAN"] = 5] = "LESSTHAN";
    CONDITION[CONDITION["LESSTHANOREQUAL"] = 6] = "LESSTHANOREQUAL";
    CONDITION[CONDITION["STARTWITH"] = 7] = "STARTWITH";
    CONDITION[CONDITION["ENDWITH"] = 8] = "ENDWITH";
    CONDITION[CONDITION["CONTAIN"] = 9] = "CONTAIN";
})(CONDITION = exports.CONDITION || (exports.CONDITION = {}));
var Condition = /** @class */ (function () {
    function Condition(key, condition, match, rename, toUpperCase) {
        this.key = key;
        this.condition = condition;
        this.match = match;
        this.rename = rename;
        this.toUpperCase = toUpperCase;
    }
    return Condition;
}());
exports.Condition = Condition;
function Conditioning(d, key, condition, match, isUpperCase) {
    var dataValue;
    if (isUpperCase !== undefined) {
        if (isUpperCase) {
            dataValue = d[key].toString().toUpperCase();
        }
        else {
            dataValue = d[key].toString().toLowerCase();
        }
    }
    else {
        dataValue = d[key];
    }
    switch (condition) {
        case CONDITION.EQUAL:
            return dataValue === match;
        case CONDITION.NOTEQUAL:
            return dataValue !== match;
        case CONDITION.LESSTHAN:
            return dataValue < match;
        case CONDITION.LESSTHANOREQUAL:
            return dataValue <= match;
        case CONDITION.MORETHAN:
            return dataValue > match;
        case CONDITION.MORETHANOREQUAL:
            return dataValue >= match;
        case CONDITION.STARTWITH:
            return dataValue.toString().startsWith(match);
        case CONDITION.ENDWITH:
            return dataValue.toString().endsWith(match);
        case CONDITION.CONTAIN:
            return dataValue.indexOf(match) >= 0 ? true : false;
    }
}
exports.Conditioning = Conditioning;
function ConvertNoneCondition(condition) {
    if (condition === CONDITION.NONE) {
        var arr = {};
        arr.key = null;
        arr.match = null;
        arr.condition = CONDITION.NONE;
        return tool_1.AsArray(arr);
    }
    else {
        return tool_1.AsArray(condition);
    }
}
exports.ConvertNoneCondition = ConvertNoneCondition;
