"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const tool_1 = require("../util/tool");
var SORT;
(function (SORT) {
    SORT[SORT["NONE"] = 0] = "NONE";
    SORT[SORT["ACS"] = 1] = "ACS";
    SORT[SORT["DESC"] = 2] = "DESC";
})(SORT = exports.SORT || (exports.SORT = {}));
const nature_sort_1 = require("../util/nature-sort");
class Sort {
    constructor(sortType, sortProperty, naturalSort) {
        this.sortType = sortType;
        this.sortProperty = sortProperty;
        this.naturalSort = naturalSort;
        this.sortProperty = tool_1.AsArray(sortProperty);
    }
}
exports.Sort = Sort;
function Sorting(data, sortType, sortProperty, naturalSort) {
    switch (sortType) {
        case SORT.NONE:
            return data;
        case SORT.ACS: {
            return toSort(data, sortProperty, naturalSort);
        }
        case SORT.DESC: {
            return toSort(data, sortProperty, naturalSort).reverse();
        }
    }
}
exports.Sorting = Sorting;
function toSort(data, sortProperty, naturalSort) {
    let sortData = data;
    if (naturalSort == undefined) {
        naturalSort = false;
    }
    _.each(sortProperty.reverse(), (d) => {
        if (naturalSort) {
            sortData = sortData.sort((a, b) => {
                return nature_sort_1.NaturalSort(a, b, d);
            });
        }
        else {
            sortData = _.sortBy(sortData, d);
        }
    });
    return sortData;
}
