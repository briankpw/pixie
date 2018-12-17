"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sort_1 = require("./interface/sort");
var aggregate_1 = require("./interface/aggregate");
var Pixie = /** @class */ (function () {
    function Pixie(aggregateBinding, sortBinding) {
        this.measurement = [];
        this.dimension = new aggregate_1.Dimension('null', aggregate_1.TYPE.ANY);
        this.sortType = sort_1.SORT.NONE;
        if (aggregateBinding !== undefined) {
            this.data = aggregateBinding.data;
            this.measurement = aggregateBinding.measurement;
            this.dimension = aggregateBinding.dimension;
            this.dimensionList = aggregateBinding.dimensionList;
        }
        if (sortBinding !== undefined) {
            this.sortType = sortBinding.sortType;
            this.sortProperty = sortBinding.sortProperty;
        }
    }
    Pixie.prototype.getPixie = function () {
        var sortData = this.getPixieSort();
        return aggregate_1.Pixing(sortData, this.dimension, this.measurement, this.dimensionList);
    };
    Pixie.prototype.getPixieSort = function () {
        return sort_1.Sorting(this.data, this.sortType, this.sortProperty);
    };
    return Pixie;
}());
exports.Pixie = Pixie;
console.log();
