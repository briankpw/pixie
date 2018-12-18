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
export {};
