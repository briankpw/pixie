declare function pixieGroup(pixieData: any, groupByKey: string): any;
declare function pixieSumGroupBy(pixieData: any, groupByKey: string, sumKey: string): any;
declare function pixieSumAllBy(pixieData: any, groupByKey: string): number;
declare function pixieSumAllByObject(pixieData: any, sumByKey: Array<string>): any;
declare function pixieAddKey(pixieData: any, key: any, value: any): any;
declare function pixieReplaceValue(pixieData: any, key: any, value: any): any;
declare function pixieRemoveDuplicate(pixieData: any, key?: any): any;
declare function pixiePluckXIncrement(pixieData: any, key: any, renameX?: any): any;
export { pixieGroup, pixieSumGroupBy, pixieSumAllBy, pixieSumAllByObject, pixieAddKey, pixieReplaceValue, pixieRemoveDuplicate, pixiePluckXIncrement };
