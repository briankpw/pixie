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
  Object.defineProperty(Array.prototype, 'pixieGroup', {
    value: function<T>(this: T[], groupByKey: string): T[] {
      return pixieGroup(this, groupByKey);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}

if (!Array.prototype.pixieSumGroupBy) {
  Object.defineProperty(Array.prototype, 'pixieSumGroupBy', {
    value: function<T>(this: T[], groupByKey: string, sumByKey: string): T[] {
      return pixieSumGroupBy(this, groupByKey, sumByKey);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}
if (!Array.prototype.pixieSumBy) {
  Object.defineProperty(Array.prototype, 'pixieSumBy', {
    value: function<T>(this: T[], sumByKey: string): number {
      return pixieSumBy(this, sumByKey);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}

if (!Array.prototype.pixieSumByEachObject) {
  Object.defineProperty(Array.prototype, 'pixieSumByEachObject', {
    value: function<T>(this: T[], sumByKey: Array<string>): T[] {
      return pixieSumByEachObject(this, sumByKey);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}

if (!Array.prototype.pixieAddKey) {
  Object.defineProperty(Array.prototype, 'pixieAddKey', {
    value: function<T>(this: T[], key: T, value: T): T[] {
      return pixieAddKey(this, key, value);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}

if (!Array.prototype.pixieReplaceValue) {
  Object.defineProperty(Array.prototype, 'pixieReplaceValue', {
    value: function<T>(this: T[], key: T, value: T): T[] {
      return pixieReplaceValue(this, key, value);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}

if (!Array.prototype.pixiePluckIncrement) {
  Object.defineProperty(Array.prototype, 'pixiePluckIncrement', {
    value: function<T>(this: T[], key: T, renameX?: T): T[] {
      return pixiePluckIncrement(this, key, renameX);
    },
    enumerable: false,
    configurable: false,
    writable: true
  });
}
