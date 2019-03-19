import { Action } from 'redux';
import * as _ from 'underscore';
import * as math from 'mathjs';

import { Measurement } from '../model/type';
import { ReplaceAll, IsNumber } from '../util/tool';

export function parseMeasurement(d: any, index: Number, measurement: Measurement): any {
  let value = d[measurement.row];
  let name = 'y';

  try {
    if (measurement.defaultValue !== undefined) {
      value = measurement.defaultValue;
    } else if (measurement.isIncremental) {
      value = index;
    } else if (measurement.formula !== undefined) {
      value = Calculating(d, measurement.formula);
    } else {
      value = parseFloat(value.toString());
    }
  } catch (e) {
    value = 0;
  }

  if (measurement.rename !== undefined) {
    name = measurement.rename;
  }

  return {
    type: true,
    name: name,
    value: value,
    float: measurement.float
  };
}

export interface MeasurementAction extends Action {
  name: any;
  value: number;
  float: number;
}

function Calculating(d: any, formula: string) {
  const splitPattern = /[\s()*/%+-]+/g;
  let formulaWithValue = formula;
  const formulaKey = formula.split(splitPattern);

  _.chain(formulaKey)
    .compact()
    .each(key => {
      if (!IsNumber(key)) {
        formulaWithValue = ReplaceAll(formulaWithValue, key, d[key]);
      }
    });
  return math.eval(formulaWithValue);
}
