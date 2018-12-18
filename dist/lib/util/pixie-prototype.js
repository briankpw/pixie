"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pixie_1 = require("./pixie");
if (!Array.prototype.pixieGroup) {
    Array.prototype.pixieGroup = function (groupByKey) {
        return pixie_1.pixieGroup(this, groupByKey);
    };
}
if (!Array.prototype.pixieSumGroupBy) {
    Array.prototype.pixieSumGroupBy = function (groupByKey, sumByKey) {
        return pixie_1.pixieSumGroupBy(this, groupByKey, sumByKey);
    };
}
if (!Array.prototype.pixieSumBy) {
    Array.prototype.pixieSumBy = function (sumByKey) {
        return pixie_1.pixieSumBy(this, sumByKey);
    };
}
if (!Array.prototype.pixieSumByEachObject) {
    Array.prototype.pixieSumByEachObject = function (sumByKey) {
        return pixie_1.pixieSumByEachObject(this, sumByKey);
    };
}
if (!Array.prototype.pixieAddKey) {
    Array.prototype.pixieAddKey = function (key, value) {
        return pixie_1.pixieAddKey(this, key, value);
    };
}
if (!Array.prototype.pixieReplaceValue) {
    Array.prototype.pixieReplaceValue = function (key, value) {
        return pixie_1.pixieReplaceValue(this, key, value);
    };
}
if (!Array.prototype.pixiePluckIncrement) {
    Array.prototype.pixiePluckIncrement = function (key, renameX) {
        return pixie_1.pixiePluckIncrement(this, key, renameX);
    };
}
