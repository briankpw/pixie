"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_1 = require("./interface/sort");
const aggregate_1 = require("./interface/aggregate");
class Pixie {
    constructor(aggregateBinding, sortBinding) {
        this._measurement = [];
        this._dimension = new aggregate_1.Dimension('null', aggregate_1.TYPE.ANY);
        this._sortType = sort_1.SORT.NONE;
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
    }
    getPixie() {
        const sortData = this.getPixieSort();
        return aggregate_1.Pixing(sortData, this._dimension, this._measurement, this._dimensionList);
    }
    getPixieSort() {
        return sort_1.Sorting(this._data, this._sortType, this._sortProperty, this._naturalSort);
    }
}
exports.Pixie = Pixie;
