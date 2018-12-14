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

function Calculating(type: PMATH, value: number, lastCount: number) {
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

export { Calculating };
