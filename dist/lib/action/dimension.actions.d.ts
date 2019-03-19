import { Action } from 'redux';
import { Dimension } from '../model/type';
export declare function parseDimension(d: any, index: Number, dimension: Dimension, additonalBinding?: boolean): any;
export interface DimensionAction extends Action {
    name: any;
    value: any;
}
