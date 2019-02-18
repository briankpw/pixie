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
    constructor(aggregateBinding?: Aggregate, sortBinding?: Sort);
    getPixie(): any;
    getPixieSort(): any;
}
