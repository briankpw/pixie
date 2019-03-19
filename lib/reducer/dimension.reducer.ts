import { Reducer, Action } from 'redux';
import { TYPE } from '../model/type';
import { DimensionAction } from '../action/dimension.actions';
import { DimensionState } from '../state/state';

let initialState: DimensionState = { name: 'x', value: '' };

export const DimensionReducer: Reducer<DimensionState> = (state: DimensionState = initialState, action: Action): any => {
  let name = (<DimensionAction>action).name;
  let value = (<DimensionAction>action).value;

  let parseValue;
  switch (action.type) {
    case TYPE.ANY:
      parseValue = value;
      break;
    case TYPE.DATE:
      parseValue = Date.parse(value);
      break;
    case TYPE.DOUBLE:
      parseValue = parseFloat(value);
      break;
    case TYPE.NUMBER:
      parseValue = parseInt(value);
      break;
    case TYPE.STRING:
      parseValue = value.toString();
      break;
    default:
      parseValue = value;
  }

  state.name = name;
  state.value = parseValue;
  return state;
};
