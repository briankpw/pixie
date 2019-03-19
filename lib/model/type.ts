import { Condition, ConvertNoneCondition } from '../model/condition';
import * as _ from 'underscore';

export enum TYPE {
  ANY,
  NUMBER,
  DOUBLE,
  STRING,
  DATE
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

export class Measurement implements MeasurementInterface {
  constructor(
    public row: string,
    public condition: Array<Condition> | any,
    public dimensionListBind: boolean = false,
    public float?: number,
    public formula?: string,
    public rename?: string,
    public defaultValue?: any,
    public isIncremental = false
  ) {
    this.condition = ConvertNoneCondition(condition);
  }
}

export class Dimension implements DimensionInterface {
  constructor(
    public column: string,
    public category: TYPE,
    public rename?: string,
    public defaultValue?: any,
    public isIncremental = false
  ) {}
}
