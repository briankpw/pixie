"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../model/type");
exports.TYPE = type_1.TYPE;
exports.Dimension = type_1.Dimension;
exports.Measurement = type_1.Measurement;
var condition_1 = require("../model/condition");
exports.CONDITION = condition_1.CONDITION;
exports.Condition = condition_1.Condition;
var tool_1 = require("../util/tool");
var _ = require("underscore");
var Aggregate = /** @class */ (function () {
    function Aggregate(data, dimension, measurement, dimensionList) {
        this.data = data;
        this.dimension = dimension;
        this.measurement = measurement;
        this.dimensionList = dimensionList;
        this.measurement = tool_1.AsArray(measurement);
        this.dimensionList = tool_1.AsArray(dimensionList);
    }
    return Aggregate;
}());
exports.Aggregate = Aggregate;
function Pixing(data, dimension, measurement, dimensionList) {
    if (dimensionList === void 0) { dimensionList = []; }
    var filterData = {};
    var dp = dimension;
    _.each(data, function (d, index) {
        // Measurement List : Loading All the Setting
        _.each(measurement, function (mp) {
            var aggreItem = {};
            if (_.findWhere(mp.condition, { condition: condition_1.CONDITION.NONE })) {
                // Get Aggregate Data
                aggreItem = Aggregating(d, dp, mp, dimensionList, index);
                // Checking The Filter Data Contain That KEY & Push
                if (filterData.hasOwnProperty(mp.row)) {
                    filterData[mp.row].push(aggreItem);
                }
                else {
                    filterData[mp.row] = [aggreItem];
                }
            }
            else {
                // Process Condition
                for (var i = 0; i < mp.condition.length; i++) {
                    var cd = mp.condition[i];
                    if (condition_1.Conditioning(d, cd.key, cd.condition, cd.match, cd.toUpperCase)) {
                        aggreItem = Aggregating(d, dp, mp, dimensionList, index);
                        // If Create any Object;
                        if (!filterData.hasOwnProperty(mp.row)) {
                            filterData[mp.row] = {};
                        }
                        // Condition : Rename
                        var conditionKey = void 0;
                        if (typeof cd.rename !== 'undefined') {
                            conditionKey = cd.rename;
                        }
                        else {
                            conditionKey = cd.match;
                        }
                        // Assign Object to the List
                        if (filterData[mp.row].hasOwnProperty(conditionKey)) {
                            filterData[mp.row][conditionKey].push(aggreItem);
                        }
                        else {
                            filterData[mp.row][conditionKey] = [aggreItem];
                        }
                        break; // If match Condition
                    }
                    else if (i === mp.condition.length - 1) {
                        // If Until The End of Array, NOT FOUND become unknown
                        aggreItem = Aggregating(d, dp, mp, dimensionList, index);
                        if (!filterData.hasOwnProperty(mp.row)) {
                            filterData[mp.row] = {};
                        }
                        // Assign Object to the List
                        if (filterData[mp.row].hasOwnProperty('unknown')) {
                            filterData[mp.row]['unknown'].push(aggreItem);
                        }
                        else {
                            filterData[mp.row]['unknown'] = [aggreItem];
                        }
                    }
                }
            }
        });
    });
    return filterData;
}
exports.Pixing = Pixing;
function Aggregating(d, dp, mp, dimensionList, index) {
    var aggreItem = {};
    // Dimension : Parsing and Rename
    if (dp.rename !== undefined) {
        aggreItem[dp.rename] = type_1.ParseDimension(dp.category, d[dp.column], dp, index);
    }
    else {
        aggreItem['x'] = type_1.ParseDimension(dp.category, d[dp.column], dp, index);
    }
    // Measurement : Assign Value Based on Formula or NONE
    if (mp.formula !== undefined) {
        // Measurement : Calculate and Apply Formula
        if (mp.rename !== undefined) {
            aggreItem[mp.rename] = type_1.ParseMeasurementWithFormula(mp.float, d, mp.formula);
        }
        else {
            aggreItem['y'] = type_1.ParseMeasurementWithFormula(mp.float, d, mp.formula);
        }
    }
    else {
        // Measurement : Parsing and Rename
        if (mp.rename !== undefined) {
            aggreItem[mp.rename] = type_1.ParseMeasurement(mp.float, d[mp.row], mp, index);
        }
        else {
            aggreItem['y'] = type_1.ParseMeasurement(mp.float, d[mp.row], mp, index);
        }
    }
    // Dimension List : Assign Additional Values Into The Array
    if (mp.dimensionListBind) {
        _.each(dimensionList, function (dpl, dplIndex) {
            if (typeof dpl.rename !== 'undefined') {
                aggreItem[dpl.rename] = type_1.ParseDimension(dpl.category, d[dpl.column], dpl, dplIndex);
            }
            else {
                aggreItem[dpl.column] = type_1.ParseDimension(dpl.category, d[dpl.column], dpl, dplIndex);
            }
        });
    }
    return aggreItem;
}
