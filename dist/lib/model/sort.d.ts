export declare enum SORT {
    NONE = 0,
    ACS = 1,
    DESC = 2
}
export interface SortInterface {
    sortType: SORT;
    sortProperty?: Array<string>;
}
export declare class Sort implements SortInterface {
    sortType: SORT;
    sortProperty?: any;
    constructor(sortType: SORT, sortProperty?: any);
}
declare function Sorting(data: any, sortType: SORT, sortProperty?: any): any;
export { Sorting };
