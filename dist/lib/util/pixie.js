"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var tool_1 = require("./tool");
require('./pixie-prototype');
function pixieGroup(pixieData, groupByKey) {
    return _.chain(pixieData)
        .groupBy(groupByKey)
        .map(function (value, key) {
        var mapObject = {};
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
        var obj = tool_1.DeepClone(value);
        // Clone first object for reduce object template 
        var clearObj = __assign({}, obj[0]);
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
    var total = 0;
    _.each(pixieData, function (d) {
        total += d[sumKey];
    });
    return total;
}
exports.pixieSumBy = pixieSumBy;
function pixieSumByEachObject(pixieData, sumByKey) {
    var data = [];
    _.each(pixieData, function (d, i) {
        var total = 0;
        _.each(sumByKey, function (key) {
            total += d[key];
        });
        var obj = __assign({}, d);
        obj['total'] = total;
        data.push(obj);
    });
    return data;
}
exports.pixieSumByEachObject = pixieSumByEachObject;
function pixieAddKey(pixieData, key, value) {
    return _.map(pixieData, function (d) {
        var mapObject = {};
        mapObject[key] = value;
        return _.extend(mapObject, d);
    });
}
exports.pixieAddKey = pixieAddKey;
function pixieReplaceValue(pixieData, key, value) {
    return _.map(pixieData, function (d) {
        var mapObject = {};
        mapObject[key] = value;
        return _.extend(d, mapObject);
    });
}
exports.pixieReplaceValue = pixieReplaceValue;
function pixiePluckIncrement(pixieData, key, rename) {
    if (rename === void 0) { rename = 'x'; }
    var pluck = _.pluck(pixieData, key);
    return _.map(pluck, function (d, i) {
        var pluckPixie = {};
        pluckPixie[rename] = i;
        pluckPixie[key] = d;
        return pluckPixie;
    });
}
exports.pixiePluckIncrement = pixiePluckIncrement;
