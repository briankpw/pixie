declare function pixieGroup(pixieData: any, groupByKey: string): any;
declare function pixieSumGroupBy(pixieData: any, groupByKey: string, sumKey: Array<string>): any;
declare function pixieSumBy(pixieData: any, sumKey: string): number;
declare function pixieSumByEachObject(pixieData: any, sumByKey: Array<string>): any;
declare function pixieAddKey(pixieData: any, key: any, value: any): any;
declare function pixieReplaceValue(pixieData: any, key: any, value: any): any;
declare function pixiePluckIncrement(pixieData: any, key: any, rename?: any): any;
export { pixieGroup, pixieSumGroupBy, pixieSumBy, pixieSumByEachObject, pixieAddKey, pixieReplaceValue, pixiePluckIncrement };
