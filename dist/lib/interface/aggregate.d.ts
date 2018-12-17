import { TYPE, Dimension, Measurement } from '../model/type';
import { CONDITION, Condition } from '../model/condition';
export interface AggregateInterface {
    data: any;
    dimension: Dimension;
    measurement: Array<Measurement>;
    dimensionList?: Array<Dimension>;
}
export declare class Aggregate implements AggregateInterface {
    data: any;
    dimension: Dimension;
    measurement: Array<Measurement>;
    dimensionList?: Dimension[] | undefined;
    constructor(data: any, dimension: Dimension, measurement: Array<Measurement>, dimensionList?: Dimension[] | undefined);
}
declare function Pixing(data: any, dimension: Dimension, measurement: Array<Measurement>, dimensionList?: Array<Dimension>): any;
export { Pixing };
export { TYPE, CONDITION, Condition, Dimension, Measurement };
