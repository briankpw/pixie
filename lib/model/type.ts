import { Condition, ConvertNoneCondition } from '../model/condition';
import { Calculating } from '../model/pmath';

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

function ParseDimension(type: TYPE, value: any, dp: Dimension, index: number) {
  if (dp.defaultValue !== undefined) {
    value = dp.defaultValue;
  } else if (dp.isIncremental) {
    return index;
  }

  switch (type) {
    case TYPE.ANY:
      return value;
    case TYPE.DATE:
      return Date.parse(value);
    case TYPE.DOUBLE:
      return parseFloat(value);
    case TYPE.NUMBER:
      return parseInt(value);
    case TYPE.STRING:
      return value.toString();
  }
}

function ParseMeasurement(float: number | undefined, value: number, mp: Measurement, index: number) {
  try {
    if (mp.defaultValue !== undefined) {
      value = mp.defaultValue;
    } else if (mp.isIncremental) {
      return index;
    } else {
      value = parseFloat(value.toString());
    }
  } catch (e) {
    return 0;
  }

  switch (float) {
    case 0:
    case null:
    case undefined:
      return value;
    default:
      return parseFloat(value.toFixed(float));
  }
}

function ParseMeasurementWithFormula(float: number | undefined, d: any, formula: string) {
  let count: number = 0;

  try {
    count = Calculating(d, formula);
  } catch (e) {
    return 0;
  }

  switch (float) {
    case 0:
    case null:
    case undefined:
      return count;
    default:
      return parseFloat(count.toFixed(float));
  }
}

export { ParseDimension, ParseMeasurement, ParseMeasurementWithFormula };
