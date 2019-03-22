import { Action } from 'redux';
import { Dimension } from '../model/type';

export function parseDimension(d: any, index: Number, dimension: Dimension, additonalBinding = false): any {
  let value = d[dimension.column];
  let name = 'x';

  if (dimension.defaultValue !== undefined) {
    value = dimension.defaultValue;
  } else if (dimension.isIncremental) {
    value = index;
  }

  if (additonalBinding) {
    name = dimension.column;
  }

  if (dimension.rename !== undefined) {
    name = dimension.rename;
  }

  return {
    type: dimension.category,
    name: name,
    value: value
  };
}

export interface DimensionAction extends Action {
  name: any;
  value: any;
}
