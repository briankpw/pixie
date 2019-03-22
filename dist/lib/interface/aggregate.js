"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const redux_1 = require("redux");
const type_1 = require("../model/type");
exports.TYPE = type_1.TYPE;
exports.Dimension = type_1.Dimension;
exports.Measurement = type_1.Measurement;
const condition_1 = require("../model/condition");
exports.CONDITION = condition_1.CONDITION;
exports.Condition = condition_1.Condition;
const tool_1 = require("../util/tool");
const reducer_1 = require("../reducer/reducer");
const Action = require("../action/actions");
class Aggregate {
    constructor(data, dimension, measurement, dimensionList) {
        this.data = data;
        this.dimension = dimension;
        this.measurement = measurement;
        this.dimensionList = dimensionList;
        this.measurement = tool_1.AsArray(measurement);
        this.dimensionList = tool_1.AsArray(dimensionList);
    }
}
exports.Aggregate = Aggregate;
function Pixing(data, dimension, measurement, dimensionList = []) {
    const dp = dimension;
    let conditionStore = redux_1.createStore(reducer_1.ConditionReducer);
    _.each(data, (d, index) => {
        // Measurement List : Loading All the Setting
        _.each(measurement, mp => {
            // Preparing the Data
            const aggreData = Aggregating(d, dp, mp, dimensionList, index);
            // Data Based on Condition
            conditionStore.dispatch(Action.parseCondition(d, mp, aggreData));
        });
    });
    return conditionStore.getState();
}
exports.Pixing = Pixing;
function Aggregating(d, dp, mp, dimensionList, index) {
    const aggreItem = {};
    let dimensionStore = redux_1.createStore(reducer_1.DimensionReducer);
    let measurementStore = redux_1.createStore(reducer_1.MeasurementReducer);
    dimensionStore.dispatch(Action.parseDimension(d, index, dp));
    measurementStore.dispatch(Action.parseMeasurement(d, index, mp));
    aggreItem[dimensionStore.getState().name] = dimensionStore.getState().value;
    aggreItem[measurementStore.getState().name] = measurementStore.getState().value;
    // Dimension List : Assign Additional Values Into The Array
    if (mp.dimensionListBind) {
        _.each(dimensionList, (dpl) => {
            dimensionStore.dispatch(Action.parseDimension(d, index, dpl, true));
            aggreItem[dimensionStore.getState().name] = dimensionStore.getState().value;
        });
    }
    return aggreItem;
}
