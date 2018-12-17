import { Sort } from './interface/sort';
import { Aggregate } from './interface/aggregate';
export declare class Pixie {
    private data;
    private measurement;
    private dimension;
    private dimensionList?;
    private sortType;
    private sortProperty;
    constructor(aggregateBinding?: Aggregate, sortBinding?: Sort);
    getPixie(): any;
    getPixieSort(): any;
}
