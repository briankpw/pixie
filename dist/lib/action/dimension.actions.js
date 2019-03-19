"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseDimension(d, index, dimension, additonalBinding = false) {
    let value = d[dimension.column];
    let name = 'x';
    if (dimension.defaultValue !== undefined) {
        value = dimension.defaultValue;
    }
    else if (dimension.isIncremental) {
        value = index;
    }
    if (dimension.rename !== undefined) {
        name = dimension.rename;
    }
    if (additonalBinding) {
        name = dimension.column;
    }
    return {
        type: dimension.category,
        name: name,
        value: value
    };
}
exports.parseDimension = parseDimension;
