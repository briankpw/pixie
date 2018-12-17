"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
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
        var total = _.reduce(value, function (acc, val) {
            return acc + val[sumKey];
        }, 0);
        return { x: value[0][groupByKey], y: total };
    })
        .value();
}
exports.pixieSumGroupBy = pixieSumGroupBy;
function pixieSumAllBy(pixieData, groupByKey) {
    var total = 0;
    _.each(pixieData[groupByKey], function (d) {
        total += d.y;
    });
    return total;
}
exports.pixieSumAllBy = pixieSumAllBy;
function pixieSumAllByObject(pixieData, sumByKey) {
    _.each(pixieData, function (d, i) {
        var total = 0;
        _.each(sumByKey, function (key) {
            total += d.key;
        });
        pixieData[i]['total'] = total;
    });
    return pixieData;
}
exports.pixieSumAllByObject = pixieSumAllByObject;
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
function pixieRemoveDuplicate(pixieData, key) {
    if (_.isArray(pixieData)) {
        var keyValue_1;
        var temp_1 = -0.01;
        var xTemp_1;
        var arr_1 = [];
        if (key !== undefined) {
            keyValue_1 = key;
        }
        else {
            keyValue_1 = 'y';
        }
        _.each(pixieData, function (d, i) {
            if (d[keyValue_1] > temp_1 || d[keyValue_1] < temp_1) {
                if (i !== 0) {
                    var next = {};
                    next['x'] = xTemp_1;
                    next[keyValue_1] = d[keyValue_1];
                    arr_1.push(next);
                }
                xTemp_1 = d.x;
                temp_1 = d[keyValue_1];
                arr_1.push(d);
            }
        });
        if (arr_1[arr_1.length - 1].x !== pixieData[pixieData.length - 1].x) {
            arr_1.push(pixieData[pixieData.length - 1]);
        }
        return arr_1;
    }
    else {
        return [];
    }
}
exports.pixieRemoveDuplicate = pixieRemoveDuplicate;
function pixiePluckXIncrement(pixieData, key, renameX) {
    var pluck = _.pluck(pixieData, key);
    return _.map(pluck, function (d, i) {
        var pluckPixie = {};
        if (renameX !== undefined) {
            pluckPixie[renameX] = i;
            pluckPixie[key] = d;
        }
        else {
            pluckPixie['x'] = i;
            pluckPixie[key] = d;
        }
        return pluckPixie;
    });
}
exports.pixiePluckXIncrement = pixiePluckXIncrement;
