"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("./interface/sort");
const aggregate_1 = require("./interface/aggregate");
class Pixie {
    constructor(aggregateBinding, sortBinding, debug = false) {
        this._measurement = [];
        this._dimension = new aggregate_1.Dimension('null', aggregate_1.TYPE.ANY);
        this._sortType = sort_1.SORT.NONE;
        this._isSorted = false;
        this._debug = false;
        if (aggregateBinding !== undefined) {
            this._data = aggregateBinding.data;
            this._measurement = aggregateBinding.measurement;
            this._dimension = aggregateBinding.dimension;
            this._dimensionList = aggregateBinding.dimensionList;
        }
        if (sortBinding !== undefined) {
            this._sortType = sortBinding.sortType;
            this._sortProperty = sortBinding.sortProperty;
            this._naturalSort = sortBinding.naturalSort;
        }
        this._debug = debug;
    }
    getPixie() {
        const sortData = this.getPixieSort();
        this.debugging('getPixie');
        const pixieData = aggregate_1.Pixing(sortData, this._dimension, this._measurement, this._dimensionList);
        this.debugging('getPixie', false);
        return pixieData;
    }
    getPixieSort() {
        this.debugging('getPixieSort');
        let sortData;
        if (this._isSorted) {
            sortData = this._data;
        }
        else {
            this._isSorted = true;
            sortData = sort_1.Sorting(this._data, this._sortType, this._sortProperty, this._naturalSort);
        }
        this.debugging('getPixieSort', false);
        return sortData;
    }
    // Debug
    debugging(title, start = true) {
        if (this._debug) {
            if (start) {
                console.time(title);
            }
            else {
                console.timeEnd(title);
            }
        }
    }
}
exports.Pixie = Pixie;
