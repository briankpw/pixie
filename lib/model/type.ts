import { CONDITION, Condition, ConvertNoneCondition } from '../model/condition';
import { PMath, PMATH, Calculating } from '../model/pmath';
import { AsArray } from '../util/tool';
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
  formula?: Array<PMath>;
  float?: number;
  defaultValue?: any;
  isIncremental: boolean;
}

export class Measurement implements MeasurementInterface {
  constructor(
    public row: string,
    public condition: Array<Condition>,
    public dimensionListBind: boolean = false,
    public float?: number,
    public formula?: Array<PMath>,
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

  // console.log('float');
  // console.log(float);
  switch (float) {
    case 0:
    case null:
    case undefined:
      return value;
    default:
      return parseFloat(value.toFixed(float));
  }
}

function ParseMeasurementWithFormula(float: number | undefined, d: any, formula: Array<PMath>) {
  let count: number = 0;
  let packageCount: number = 0;
  let isPackageStartEnd: number = 0;
  let firstPackage: boolean;
  let nextMath: PMATH;
  let breakMath: PMATH;

  // 0-Normal 1=( 2=Normal Package 3=)
  _.each(formula, (f, i) => {
    if (typeof f.isPackageStartEnd === 'undefined') {
      if (isPackageStartEnd === 0) {
        isPackageStartEnd = 0;
      } else {
        isPackageStartEnd = 2;
      }
    } else if (f.isPackageStartEnd) {
      isPackageStartEnd = 1;
      breakMath = nextMath;
    } else {
      isPackageStartEnd = 3;
    }

    let dataCount;
    if (_.isString(f.key)) {
      dataCount = d[f.key];
    } else {
      dataCount = f.key;
    }

    if (i === 0) {
      // When Launch First Time
      if (isPackageStartEnd === 1) {
        packageCount = dataCount;
        firstPackage = true;
      } else {
        count = dataCount;
      }
      nextMath = f.pMath;
    } else if (isPackageStartEnd === 0) {
      // First Value Math With New Value
      count = Calculating(nextMath, dataCount, count);
      nextMath = f.pMath;
    } else if (isPackageStartEnd === 1) {
      // Bracket Started
      packageCount = dataCount;
      nextMath = f.pMath;
    } else if (isPackageStartEnd === 2) {
      // Bracket Continue
      packageCount = Calculating(nextMath, dataCount, packageCount);
      nextMath = f.pMath;
    } else if (isPackageStartEnd === 3) {
      // Bracket End and Count MATH Package
      packageCount = Calculating(nextMath, dataCount, packageCount);
      // First Times Ignore Calculations
      if (firstPackage) {
        count = packageCount;
        firstPackage = false;
      } else {
        count = Calculating(breakMath, packageCount, count);
      }
      nextMath = f.pMath;
      packageCount = 0;
      isPackageStartEnd = 0;
    }
  });

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
