import { Condition } from '../model/condition';
export declare enum TYPE {
    ANY = 0,
    NUMBER = 1,
    DOUBLE = 2,
    STRING = 3,
    DATE = 4
}
export interface DimensionInterface {
    column: string;
    category: TYPE;
    rename?: string;
    defaultValue?: any;
    isIncremental: boolean;
}
export interface MeasurementInterface {
    row: string;
    condition: Array<Condition>;
    dimensionListBind: boolean;
    rename?: string;
    formula?: string;
    float?: number;
    defaultValue?: any;
    isIncremental: boolean;
}
export declare class Measurement implements MeasurementInterface {
    row: string;
    condition: Array<Condition> | any;
    dimensionListBind: boolean;
    float?: number | undefined;
    formula?: string | undefined;
    rename?: string | undefined;
    defaultValue?: any;
    isIncremental: boolean;
    constructor(row: string, condition: Array<Condition> | any, dimensionListBind?: boolean, float?: number | undefined, formula?: string | undefined, rename?: string | undefined, defaultValue?: any, isIncremental?: boolean);
}
export declare class Dimension implements DimensionInterface {
    column: string;
    category: TYPE;
    rename?: string | undefined;
    defaultValue?: any;
    isIncremental: boolean;
    constructor(column: string, category: TYPE, rename?: string | undefined, defaultValue?: any, isIncremental?: boolean);
}
