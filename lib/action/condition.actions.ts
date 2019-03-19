import { Action } from 'redux';
import * as _ from 'underscore';

import { Condition, CONDITION } from '../model/condition';
import { Measurement } from '../model/type';

export function parseCondition(d: any, measurement: Measurement, aggreData: any): any {
  let name: any = null;
  let condition: Boolean = false;

  if (!_.findWhere(measurement.condition, { condition: CONDITION.NONE })) {
    condition = true;

    for (let i = 0; i < measurement.condition.length; i++) {
      const cd: Condition = measurement.condition[i];
      let value: any = d[cd.key];

      if (cd.toUpperCase !== undefined) {
        if (cd.toUpperCase) {
          value = value.toString().toUpperCase();
        } else {
          value = value.toString().toLowerCase();
        }
      }

      if (Conditioning(value, cd.match, cd.condition)) {
        if (cd.rename !== undefined) {
          name = cd.rename;
        } else {
          name = cd.match;
        }
        break;
      } else {
        name = 'unknown';
      }
    }
  }

  return {
    type: condition,
    parent: measurement.row,
    child: name,
    data: aggreData
  };
}

export interface ConditionAction extends Action {
  parent: any;
  child: any;
  data: any;
}

function Conditioning(value: any, match: any, condition: CONDITION) {
  switch (condition) {
    case CONDITION.EQUAL:
      return value === match;
    case CONDITION.NOTEQUAL:
      return value !== match;
    case CONDITION.LESSTHAN:
      return value < match;
    case CONDITION.LESSTHANOREQUAL:
      return value <= match;
    case CONDITION.MORETHAN:
      return value > match;
    case CONDITION.MORETHANOREQUAL:
      return value >= match;
    case CONDITION.STARTWITH:
      return value.toString().startsWith(match);
    case CONDITION.ENDWITH:
      return value.toString().endsWith(match);
    case CONDITION.CONTAIN:
      return value.indexOf(match) >= 0 ? true : false;
  }
}
