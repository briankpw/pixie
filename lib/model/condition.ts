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
  match: string | number;
  rename?: string;
  toUpperCase?: boolean;
}

export class Condition implements ConditionInterface {
  constructor(
    public key: string,
    public condition: CONDITION,
    public match: string | number,
    public rename?: string,
    public toUpperCase?: boolean
  ) {}
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

export {  ConvertNoneCondition };
