export declare enum CONDITION {
    NONE = 0,
    EQUAL = 1,
    NOTEQUAL = 2,
    MORETHAN = 3,
    MORETHANOREQUAL = 4,
    LESSTHAN = 5,
    LESSTHANOREQUAL = 6,
    STARTWITH = 7,
    ENDWITH = 8,
    CONTAIN = 9
}
export interface ConditionInterface {
    key: string;
    condition: CONDITION;
    match: string | number;
    rename?: string;
    toUpperCase?: boolean;
}
export declare class Condition implements ConditionInterface {
    key: string;
    condition: CONDITION;
    match: string | number;
    rename?: string | undefined;
    toUpperCase?: boolean | undefined;
    constructor(key: string, condition: CONDITION, match: string | number, rename?: string | undefined, toUpperCase?: boolean | undefined);
}
declare function ConvertNoneCondition(condition: any): any;
export { ConvertNoneCondition };
