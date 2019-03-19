import { Action } from 'redux';
import { Measurement } from '../model/type';
export declare function parseMeasurement(d: any, index: Number, measurement: Measurement): any;
export interface MeasurementAction extends Action {
    name: any;
    value: number;
    float: number;
}
