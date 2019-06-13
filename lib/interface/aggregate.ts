import * as _ from 'underscore';
import { createStore, Store } from 'redux';

import { TYPE, Dimension, Measurement } from '../model/type';
import { CONDITION, Condition } from '../model/condition';
import { AsArray } from '../util/tool';

import { DimensionReducer, MeasurementReducer, ConditionReducer } from '../reducer/reducer';
import { DimensionState, MeasurementState } from '../state/state';
import * as Action from '../action/actions';

export interface AggregateInterface {
  data: any;
  dimension: Dimension;
  measurement: Array<Measurement>;
  dimensionList?: Array<Dimension>;
}

export class Aggregate implements AggregateInterface {
  constructor(
    public data: any,
    public dimension: Dimension,
    public measurement: Array<Measurement>,
    public dimensionList?: Array<Dimension>
  ) {
    this.measurement = AsArray(measurement);
    this.dimensionList = AsArray(dimensionList);
  }
}

function Pixing(data: any, dimension: Dimension, measurement: Array<Measurement>, dimensionList: Array<Dimension> = []) {
  const dp = dimension;
  let conditionStore: Store<any> = createStore(ConditionReducer);

  _.each(data, (d, index) => {
    // Measurement List : Loading All the Setting
    _.each(measurement, mp => {
      // Preparing the Data
      const aggreData = Aggregating(d, dp, mp, dimensionList, index);
      // Data Based on Condition
      conditionStore.dispatch(Action.parseCondition(d, mp, aggreData));
    });
  });
  return conditionStore.getState();
}

function Aggregating(d: any, dp: Dimension, mp: Measurement, dimensionList: Array<Dimension>, index: number) {
  const aggreItem: any = {};
  let dimensionStore: Store<DimensionState> = createStore(DimensionReducer);
  let measurementStore: Store<MeasurementState> = createStore(MeasurementReducer);

  dimensionStore.dispatch(Action.parseDimension(d, index, dp));
  measurementStore.dispatch(Action.parseMeasurement(d, index, mp));

  aggreItem[dimensionStore.getState().name] = dimensionStore.getState().value;
  aggreItem[measurementStore.getState().name] = measurementStore.getState().value;

  // Dimension List : Assign Additional Values Into The Array
  if (mp.dimensionListBind) {
    _.each(dimensionList, (dpl: any) => {
      dimensionStore.dispatch(Action.parseDimension(d, index, dpl, true));
      aggreItem[dimensionStore.getState().name] = dimensionStore.getState().value;
    });
  }

  return aggreItem;
}

export { Pixing };
export { TYPE, CONDITION, Condition, Dimension, Measurement };
