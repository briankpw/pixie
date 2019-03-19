import { Reducer, Action } from 'redux';
import { ConditionAction } from '../action/condition.actions';

export const ConditionReducer: Reducer<any> = (state: any, action: Action): any => {
  if (typeof state === 'undefined') {
    return {};
  }

  let parent = (<ConditionAction>action).parent;
  let child = (<ConditionAction>action).child;
  let data = (<ConditionAction>action).data;

  if (action.type) {
    if (state.hasOwnProperty(parent)) {
      if (state[parent].hasOwnProperty(child)) {
        state[parent][child].push(data);
      } else {
        state[parent][child] = [data];
      }
    } else {
      state[parent] = {};
      state[parent][child] = [data];
    }
  } else {
    if (state.hasOwnProperty(parent)) {
      state[parent].push(data);
    } else {
      state[parent] = [data];
    }
  }

  return state;
};
