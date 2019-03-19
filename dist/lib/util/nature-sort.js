"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Performance is 3x Faster of release/v1 - StandardNaturalSort
function NaturalSort(a, b, property) {
    var ax = [], bx = [];
    if (a[property] == null) {
        a[property] = '';
    }
    if (b[property] == null) {
        b[property] = '';
    }
    a[property].replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        ax.push([$1 || Infinity, $2 || '']);
    });
    b[property].replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        bx.push([$1 || Infinity, $2 || '']);
    });
    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
        if (nn) {
            return nn;
        }
    }
    return ax.length - bx.length;
}
exports.NaturalSort = NaturalSort;
