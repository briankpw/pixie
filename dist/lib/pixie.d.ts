import { Sort } from './interface/sort';
import { Aggregate } from './interface/aggregate';
export declare class Pixie {
    private _data;
    private _measurement;
    private _dimension;
    private _dimensionList?;
    private _sortType;
    private _sortProperty;
    private _naturalSort;
    private _isSorted;
    private _debug;
    constructor(aggregateBinding?: Aggregate, sortBinding?: Sort, debug?: boolean);
    getPixie(): any;
    getPixieSort(): any;
    private debugging;
}
