import { TYPE, Dimension, Measurement, ParseDimension, ParseMeasurement, ParseMeasurementWithFormula } from '../model/type';
import { CONDITION, Conditioning, Condition } from '../model/condition';
import { PMATH, PMath } from '../model/pmath';

import { AsArray } from '../util/tool';
import * as _ from 'underscore';

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
  const filterData: any = {};
  const dp = dimension;

  _.each(data, (d, index) => {
    // Measurement List : Loading All the Setting
    _.each(measurement, mp => {
      let aggreItem = {};
      if (_.findWhere(mp.condition, { condition: CONDITION.NONE })) {
        // Get Aggregate Data
        aggreItem = Aggregating(d, dp, mp, dimensionList, index);
        // Checking The Filter Data Contain That KEY & Push
        if (filterData.hasOwnProperty(mp.row)) {
          filterData[mp.row].push(aggreItem);
        } else {
          filterData[mp.row] = [aggreItem];
        }
      } else {
        // Process Condition
        for (let i = 0; i < mp.condition.length; i++) {
          const cd = mp.condition[i];

          if (Conditioning(d, cd.key, cd.condition, cd.match, cd.toUpperCase)) {
            aggreItem = Aggregating(d, dp, mp, dimensionList, index);
            // If Create any Object;
            if (!filterData.hasOwnProperty(mp.row)) {
              filterData[mp.row] = {};
            }

            // Condition : Rename
            let conditionKey;
            if (typeof cd.rename !== 'undefined') {
              conditionKey = cd.rename;
            } else {
              conditionKey = cd.match;
            }

            // Assign Object to the List
            if (filterData[mp.row].hasOwnProperty(conditionKey)) {
              filterData[mp.row][conditionKey].push(aggreItem);
            } else {
              filterData[mp.row][conditionKey] = [aggreItem];
            }
            break; // If match Condition
          } else if (i === mp.condition.length - 1) {
            // If Until The End of Array, NOT FOUND become unknown
            aggreItem = Aggregating(d, dp, mp, dimensionList, index);

            if (!filterData.hasOwnProperty(mp.row)) {
              filterData[mp.row] = {};
            }

            // Assign Object to the List
            if (filterData[mp.row].hasOwnProperty('unknown')) {
              filterData[mp.row]['unknown'].push(aggreItem);
            } else {
              filterData[mp.row]['unknown'] = [aggreItem];
            }
          }
        }
      }
    });
  });
  return filterData;
}

function Aggregating(d: any, dp: Dimension, mp: Measurement, dimensionList: Array<Dimension>, index: number) {
  const aggreItem: any = {};

  // Dimension : Parsing and Rename
  if (dp.rename !== undefined) {
    aggreItem[dp.rename] = ParseDimension(dp.category, d[dp.column], dp, index);
  } else {
    aggreItem['x'] = ParseDimension(dp.category, d[dp.column], dp, index);
  }

  // Measurement : Assign Value Based on Formula or NONE
  if (mp.formula !== undefined) {
    // Measurement : Calculate and Apply Formula
    if (mp.rename !== undefined) {
      aggreItem[mp.rename] = ParseMeasurementWithFormula(mp.float, d, mp.formula);
    } else {
      aggreItem['y'] = ParseMeasurementWithFormula(mp.float, d, mp.formula);
    }
  } else {
    // Measurement : Parsing and Rename
    if (mp.rename !== undefined) {
      aggreItem[mp.rename] = ParseMeasurement(mp.float, d[mp.row], mp, index);
    } else {
      aggreItem['y'] = ParseMeasurement(mp.float, d[mp.row], mp, index);
    }
  }

  // Dimension List : Assign Additional Values Into The Array
  if (mp.dimensionListBind) {
    _.each(dimensionList, (dpl: any, dplIndex) => {
      if (typeof dpl.rename !== 'undefined') {
        aggreItem[dpl.rename] = ParseDimension(dpl.category, d[dpl.column], dpl, dplIndex);
      } else {
        aggreItem[dpl.column] = ParseDimension(dpl.category, d[dpl.column], dpl, dplIndex);
      }
    });
  }

  return aggreItem;
}

export { Pixing };
export { TYPE, CONDITION, Condition, Dimension, Measurement };
export { PMATH, PMath }