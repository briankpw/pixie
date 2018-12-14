import { AsArray } from '../util/tool';

export enum CONDITION {
  NONE,
  EQUAL,
  NOTEQUAL,
  MORETHAN,
  MORETHANOREQUAL,
  LESSTHAN,
  LESSTHANOREQUAL,
  STARTWITH,
  ENDWITH,
  CONTAIN
}

export interface ConditionInterface {
  key: string;
  condition: CONDITION;
  match: string;
  rename?: string;
  toUpperCase?: boolean;
}

export class Condition implements ConditionInterface {
  constructor(
    public key: string,
    public condition: CONDITION,
    public match: string,
    public rename?: string,
    public toUpperCase?: boolean
  ) {}
}

function Conditioning(d: any, key: string, condition: CONDITION, match: string, isUpperCase?: boolean) {
  let dataValue;

  if (isUpperCase !== undefined) {
    if (isUpperCase) {
      dataValue = d[key].toString().toUpperCase();
    } else {
      dataValue = d[key].toString().toLowerCase();
    }
  } else {
    dataValue = d[key];
  }

  switch (condition) {
    case CONDITION.EQUAL:
      return dataValue === match;
    case CONDITION.NOTEQUAL:
      return dataValue !== match;
    case CONDITION.LESSTHAN:
      return dataValue < match;
    case CONDITION.LESSTHANOREQUAL:
      return dataValue <= match;
    case CONDITION.MORETHAN:
      return dataValue > match;
    case CONDITION.MORETHANOREQUAL:
      return dataValue >= match;
    case CONDITION.STARTWITH:
      return dataValue.toString().startsWith(match);
    case CONDITION.ENDWITH:
      return dataValue.toString().endsWith(match);
    case CONDITION.CONTAIN:
      return dataValue.indexOf(match) >= 0 ? true : false;
  }
}

function ConvertNoneCondition(condition: any) {
  if (condition === CONDITION.NONE) {
    const arr: any = {};
    arr.key = null;
    arr.match = null;
    arr.condition = CONDITION.NONE;
    return AsArray(arr);
  } else {
    return AsArray(condition);
  }
}

export { Conditioning, ConvertNoneCondition };
