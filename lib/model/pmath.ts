import * as _ from 'underscore';
import * as math from 'mathjs';
import { ReplaceAll, IsNumber } from '../util/tool';

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
