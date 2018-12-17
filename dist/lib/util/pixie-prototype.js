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
if (!Array.prototype.pixieSumAllBy) {
    Array.prototype.pixieSumAllBy = function (sumByKey) {
        return pixie_1.pixieSumAllBy(this, sumByKey);
    };
}
if (!Array.prototype.pixieSumAllByObject) {
    Array.prototype.pixieSumAllByObject = function (sumByKey) {
        return pixie_1.pixieSumAllByObject(this, sumByKey);
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
if (!Array.prototype.pixieRemoveDuplicate) {
    Array.prototype.pixieRemoveDuplicate = function (key) {
        return pixie_1.pixieRemoveDuplicate(this, key);
    };
}
if (!Array.prototype.pixiePluckXIncrement) {
    Array.prototype.pixiePluckXIncrement = function (key, renameX) {
        return pixie_1.pixiePluckXIncrement(this, key, renameX);
    };
}
