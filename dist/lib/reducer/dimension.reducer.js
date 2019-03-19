"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../model/type");
let initialState = { name: 'x', value: '' };
exports.DimensionReducer = (state = initialState, action) => {
    let name = action.name;
    let value = action.value;
    let parseValue;
    switch (action.type) {
        case type_1.TYPE.ANY:
            parseValue = value;
            break;
        case type_1.TYPE.DATE:
            parseValue = Date.parse(value);
            break;
        case type_1.TYPE.DOUBLE:
            parseValue = parseFloat(value);
            break;
        case type_1.TYPE.NUMBER:
            parseValue = parseInt(value);
            break;
        case type_1.TYPE.STRING:
            parseValue = value.toString();
            break;
        default:
            parseValue = value;
    }
    state.name = name;
    state.value = parseValue;
    return state;
};
