import { Action } from 'redux';
import { Measurement } from '../model/type';
export declare function parseCondition(d: any, measurement: Measurement, aggreData: any): any;
export interface ConditionAction extends Action {
    parent: any;
    child: any;
    data: any;
}
