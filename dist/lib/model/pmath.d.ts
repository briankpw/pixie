export declare enum PMATH {
    NONE = 0,
    SUM = 1,
    SUBTRACT = 2,
    MULTIPLE = 3,
    DIVIDE = 4
}
export interface PMathInterface {
    key: string;
    pMath: PMATH;
    isPackageStartEnd?: boolean;
}
export declare class PMath implements PMathInterface {
    key: string;
    pMath: PMATH;
    isPackageStartEnd?: boolean | undefined;
    constructor(key: string, pMath: PMATH, isPackageStartEnd?: boolean | undefined);
}
declare function Calculating(type: PMATH, value: number, lastCount: number): number;
export { Calculating };
