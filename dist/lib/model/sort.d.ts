export declare enum SORT {
    NONE = 0,
    ACS = 1,
    DESC = 2
}
export interface SortInterface {
    sortType: SORT;
    sortProperty?: Array<string>;
    naturalSort?: boolean;
}
export declare class Sort implements SortInterface {
    sortType: SORT;
    sortProperty?: any;
    naturalSort?: boolean | undefined;
    constructor(sortType: SORT, sortProperty?: any, naturalSort?: boolean | undefined);
}
declare function Sorting(data: any, sortType: SORT, sortProperty?: any, naturalSort?: boolean): any;
export { Sorting };
