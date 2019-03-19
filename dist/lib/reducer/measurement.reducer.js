"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let initialState = { name: 'y', value: 0 };
exports.MeasurementReducer = (state = initialState, action) => {
    let name = action.name;
    let value = action.value;
    let float = action.float;
    switch (float) {
        case 0:
        case null:
        case undefined:
            break;
        default:
            value = parseFloat(value.toFixed(float));
    }
    state.name = name;
    state.value = value;
    return state;
};
