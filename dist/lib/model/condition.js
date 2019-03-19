"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("../util/tool");
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
class Condition {
    constructor(key, condition, match, rename, toUpperCase) {
        this.key = key;
        this.condition = condition;
        this.match = match;
        this.rename = rename;
        this.toUpperCase = toUpperCase;
    }
}
exports.Condition = Condition;
function ConvertNoneCondition(condition) {
    if (condition === CONDITION.NONE) {
        const arr = {};
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
