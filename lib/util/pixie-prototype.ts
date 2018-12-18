import {
  pixieGroup,
  pixieSumGroupBy,
  pixieSumBy,
  pixieSumByEachObject,
  pixieAddKey,
  pixieReplaceValue,
  pixiePluckIncrement
} from './pixie';

declare global {
  interface Array<T> {
    pixieGroup(groupByKey: T): Array<T>;
    pixieSumGroupBy(groupByKey: string, sumByKey: T): Array<T>;
    pixieSumBy(sumByKey: T): number;
    pixieSumByEachObject(sumByKey: Array<string>): Array<T>;
    pixieAddKey(key: T, value: T): Array<T>;
    pixieReplaceValue(key: T, value: T): Array<T>;
    pixiePluckIncrement(key: T, renameX?: T): Array<T>;
  }
}

if (!Array.prototype.pixieGroup) {
  Array.prototype.pixieGroup = function<T>(this: T[], groupByKey: string): T[] {
    return pixieGroup(this, groupByKey);
  };
}

if (!Array.prototype.pixieSumGroupBy) {
  Array.prototype.pixieSumGroupBy = function<T>(this: T[], groupByKey: string, sumByKey: string): T[] {
    return pixieSumGroupBy(this, groupByKey, sumByKey);
  };
}
if (!Array.prototype.pixieSumBy) {
  Array.prototype.pixieSumBy = function<T>(this: T[], sumByKey: string): number {
    return pixieSumBy(this, sumByKey);
  };
}
if (!Array.prototype.pixieSumByEachObject) {
  Array.prototype.pixieSumByEachObject = function<T>(this: T[], sumByKey: Array<string>): T[] {
    return pixieSumByEachObject(this, sumByKey);
  };
}

if (!Array.prototype.pixieAddKey) {
  Array.prototype.pixieAddKey = function<T>(this: T[], key: T, value: T): T[] {
    return pixieAddKey(this, key, value);
  };
}

if (!Array.prototype.pixieReplaceValue) {
  Array.prototype.pixieReplaceValue = function<T>(this: T[], key: T, value: T): T[] {
    return pixieReplaceValue(this, key, value);
  };
}


if (!Array.prototype.pixiePluckIncrement) {
  Array.prototype.pixiePluckIncrement = function<T>(this: T[], key: T, renameX?: T): T[] {
    return pixiePluckIncrement(this, key, renameX);
  };
}
