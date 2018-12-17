import * as _ from 'underscore';
import * as math from 'mathjs';
import { ReplaceAll, IsNumber } from '../util/tool';

export enum PMATH {
  NONE,
  SUM,
  SUBTRACT,
  MULTIPLE,
  DIVIDE
}

export interface PMathInterface {
  key: string;
  pMath: PMATH;
  isPackageStartEnd?: boolean;
}

export class PMath implements PMathInterface {
  constructor(public key: string, public pMath: PMATH, public isPackageStartEnd?: boolean) {}
}

function CalculatingPMath(type: PMATH, value: number, lastCount: number) {
  switch (type) {
    case PMATH.NONE:
      return lastCount;
    case PMATH.SUM:
      return lastCount + value;
    case PMATH.SUBTRACT:
      return lastCount - value;
    case PMATH.MULTIPLE:
      return lastCount * value;
    case PMATH.DIVIDE:
      return lastCount / value;
  }
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

export { Calculating };
