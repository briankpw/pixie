declare global {
    interface Array<T> {
        pixieGroup(groupByKey: T): Array<T>;
        pixieSumGroupBy(groupByKey: string, sumByKey: T): Array<T>;
        pixieSumAllBy(sumByKey: T): number;
        pixieSumAllByObject(sumByKey: Array<string>): Array<T>;
        pixieAddKey(key: T, value: T): Array<T>;
        pixieReplaceValue(key: T, value: T): Array<T>;
        pixieRemoveDuplicate(key: T): Array<T>;
        pixiePluckXIncrement(key: T, renameX?: T): Array<T>;
    }
}
export {};
