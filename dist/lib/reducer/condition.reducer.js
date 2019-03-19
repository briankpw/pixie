"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {};
    }
    let parent = action.parent;
    let child = action.child;
    let data = action.data;
    if (action.type) {
        if (state.hasOwnProperty(parent)) {
            if (state[parent].hasOwnProperty(child)) {
                state[parent][child].push(data);
            }
            else {
                state[parent][child] = [data];
            }
        }
        else {
            state[parent] = {};
            state[parent][child] = [data];
        }
    }
    else {
        if (state.hasOwnProperty(parent)) {
            state[parent].push(data);
        }
        else {
            state[parent] = [data];
        }
    }
    return state;
};
