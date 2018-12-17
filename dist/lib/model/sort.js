"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var SORT;
(function (SORT) {
    SORT[SORT["NONE"] = 0] = "NONE";
    SORT[SORT["ACS"] = 1] = "ACS";
    SORT[SORT["DESC"] = 2] = "DESC";
})(SORT = exports.SORT || (exports.SORT = {}));
var Sort = /** @class */ (function () {
    function Sort(sortType, sortProperty) {
        this.sortType = sortType;
        this.sortProperty = sortProperty;
    }
    return Sort;
}());
exports.Sort = Sort;
function Sorting(data, sortType, sortProperty) {
    switch (sortType) {
        case SORT.NONE:
            return data;
        case SORT.ACS: {
            return toSort(data, sortProperty);
        }
        case SORT.DESC: {
            return toSort(data, sortProperty).reverse();
        }
    }
}
exports.Sorting = Sorting;
function toSort(data, sortProperty) {
    var sortData = data;
    _.each(sortProperty.reverse(), function (d) {
        sortData = _.sortBy(sortData, d);
    });
    return sortData;
}
