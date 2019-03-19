"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const tool_1 = require("./tool");
require('./pixie-prototype');
function pixieGroup(pixieData, groupByKey) {
    return _.chain(pixieData)
        .groupBy(groupByKey)
        .map(function (value, key) {
        const mapObject = {};
        mapObject[groupByKey] = key;
        mapObject['data'] = value;
        return mapObject;
    })
        .value();
}
exports.pixieGroup = pixieGroup;
// Group By Key and Sum By Y By Default
function pixieSumGroupBy(pixieData, groupByKey, sumKey) {
    return _.chain(pixieData)
        .groupBy(groupByKey)
        .map(function (value) {
        const obj = tool_1.DeepClone(value);
        // Clone first object for reduce object template 
        const clearObj = Object.assign({}, obj[0]);
        _.each(tool_1.AsArray(sumKey), function (d) {
            clearObj[d] = 0;
        });
        return _.reduce(obj, function (acc, val) {
            _.each(tool_1.AsArray(sumKey), function (d) {
                acc[d] += val[d];
            });
            return acc;
        }, clearObj);
    })
        .value();
}
exports.pixieSumGroupBy = pixieSumGroupBy;
function pixieSumBy(pixieData, sumKey) {
    let total = 0;
    _.each(pixieData, (d) => {
        total += d[sumKey];
    });
    return total;
}
exports.pixieSumBy = pixieSumBy;
function pixieSumByEachObject(pixieData, sumByKey) {
    const data = [];
    _.each(pixieData, function (d, i) {
        let total = 0;
        _.each(sumByKey, function (key) {
            total += d[key];
        });
        const obj = Object.assign({}, d);
        obj['total'] = total;
        data.push(obj);
    });
    return data;
}
exports.pixieSumByEachObject = pixieSumByEachObject;
function pixieAddKey(pixieData, key, value) {
    return _.map(pixieData, function (d) {
        const mapObject = {};
        mapObject[key] = value;
        return _.extend(mapObject, d);
    });
}
exports.pixieAddKey = pixieAddKey;
function pixieReplaceValue(pixieData, key, value) {
    return _.map(pixieData, function (d) {
        const mapObject = {};
        mapObject[key] = value;
        return _.extend(d, mapObject);
    });
}
exports.pixieReplaceValue = pixieReplaceValue;
function pixiePluckIncrement(pixieData, key, rename = 'x') {
    const pluck = _.pluck(pixieData, key);
    return _.map(pluck, function (d, i) {
        const pluckPixie = {};
        pluckPixie[rename] = i;
        pluckPixie[key] = d;
        return pluckPixie;
    });
}
exports.pixiePluckIncrement = pixiePluckIncrement;
