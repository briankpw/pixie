"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const condition_1 = require("../model/condition");
function parseCondition(d, measurement, aggreData) {
    let name = null;
    let condition = false;
    if (!_.findWhere(measurement.condition, { condition: condition_1.CONDITION.NONE })) {
        condition = true;
        for (let i = 0; i < measurement.condition.length; i++) {
            const cd = measurement.condition[i];
            let value = d[cd.key];
            if (cd.toUpperCase !== undefined) {
                if (cd.toUpperCase) {
                    value = value.toString().toUpperCase();
                }
                else {
                    value = value.toString().toLowerCase();
                }
            }
            if (Conditioning(value, cd.match, cd.condition)) {
                if (cd.rename !== undefined) {
                    name = cd.rename;
                }
                else {
                    name = cd.match;
                }
                break;
            }
            else {
                name = 'unknown';
            }
        }
    }
    return {
        type: condition,
        parent: measurement.row,
        child: name,
        data: aggreData
    };
}
exports.parseCondition = parseCondition;
function Conditioning(value, match, condition) {
    switch (condition) {
        case condition_1.CONDITION.EQUAL:
            return value === match;
        case condition_1.CONDITION.NOTEQUAL:
            return value !== match;
        case condition_1.CONDITION.LESSTHAN:
            return value < match;
        case condition_1.CONDITION.LESSTHANOREQUAL:
            return value <= match;
        case condition_1.CONDITION.MORETHAN:
            return value > match;
        case condition_1.CONDITION.MORETHANOREQUAL:
            return value >= match;
        case condition_1.CONDITION.STARTWITH:
            return value.toString().startsWith(match);
        case condition_1.CONDITION.ENDWITH:
            return value.toString().endsWith(match);
        case condition_1.CONDITION.CONTAIN:
            return value.indexOf(match) >= 0 ? true : false;
    }
}
