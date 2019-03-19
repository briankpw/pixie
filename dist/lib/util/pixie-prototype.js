"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixie_1 = require("./pixie");
if (!Array.prototype.pixieGroup) {
    Object.defineProperty(Array.prototype, 'pixieGroup', {
        value: function (groupByKey) {
            return pixie_1.pixieGroup(this, groupByKey);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixieSumGroupBy) {
    Object.defineProperty(Array.prototype, 'pixieSumGroupBy', {
        value: function (groupByKey, sumByKey) {
            return pixie_1.pixieSumGroupBy(this, groupByKey, sumByKey);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixieSumBy) {
    Object.defineProperty(Array.prototype, 'pixieSumBy', {
        value: function (sumByKey) {
            return pixie_1.pixieSumBy(this, sumByKey);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixieSumByEachObject) {
    Object.defineProperty(Array.prototype, 'pixieSumByEachObject', {
        value: function (sumByKey) {
            return pixie_1.pixieSumByEachObject(this, sumByKey);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixieAddKey) {
    Object.defineProperty(Array.prototype, 'pixieAddKey', {
        value: function (key, value) {
            return pixie_1.pixieAddKey(this, key, value);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixieReplaceValue) {
    Object.defineProperty(Array.prototype, 'pixieReplaceValue', {
        value: function (key, value) {
            return pixie_1.pixieReplaceValue(this, key, value);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
if (!Array.prototype.pixiePluckIncrement) {
    Object.defineProperty(Array.prototype, 'pixiePluckIncrement', {
        value: function (key, renameX) {
            return pixie_1.pixiePluckIncrement(this, key, renameX);
        },
        enumerable: false,
        configurable: false,
        writable: true
    });
}
