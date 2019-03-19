import { Reducer, Action } from 'redux';
import { MeasurementAction } from '../action/measurement.actions';
import { MeasurementState } from '../state/state';

let initialState: MeasurementState = { name: 'y', value: 0 };

export const MeasurementReducer: Reducer<MeasurementState> = (state: MeasurementState = initialState, action: Action): any => {
  let name = (<MeasurementAction>action).name;
  let value = (<MeasurementAction>action).value;
  let float = (<MeasurementAction>action).float;

  switch (float) {
    case 0:
    case null:
    case undefined:
      break;
    default:
      value = parseFloat(value.toFixed(float));
  }

  state.name = name;
  state.value = value;
  return state;
};
