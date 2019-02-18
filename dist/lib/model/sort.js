"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var tool_1 = require("../util/tool");
var SORT;
(function (SORT) {
    SORT[SORT["NONE"] = 0] = "NONE";
    SORT[SORT["ACS"] = 1] = "ACS";
    SORT[SORT["DESC"] = 2] = "DESC";
})(SORT = exports.SORT || (exports.SORT = {}));
var nature_sort_1 = require("../util/nature-sort");
var Sort = /** @class */ (function () {
    function Sort(sortType, sortProperty, naturalSort) {
        this.sortType = sortType;
        this.sortProperty = sortProperty;
        this.naturalSort = naturalSort;
        this.sortProperty = tool_1.AsArray(sortProperty);
    }
    return Sort;
}());
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
    var sortData = data;
    if (naturalSort == undefined) {
        naturalSort = false;
    }
    _.each(sortProperty.reverse(), function (d) {
        if (naturalSort) {
            sortData = nature_sort_1.SortByNatural(sortData, function (obj) {
                return obj[d];
            });
        }
        else {
            sortData = _.sortBy(sortData, d);
        }
    });
    return sortData;
}
