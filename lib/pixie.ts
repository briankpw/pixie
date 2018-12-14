import * as _ from 'underscore';

import { Sort, SORT, Sorting } from './interface/sort';
import { Aggregate, Dimension, Measurement, TYPE, Pixing } from './interface/aggregate';

export class Pixie {
  private data: any;
  private measurement: Array<Measurement> = [];

  private dimension: Dimension = new Dimension('null', TYPE.ANY);
  private dimensionList?: Array<Dimension>;

  private sortType: SORT = SORT.NONE;
  private sortProperty: Array<string> | undefined;

  constructor(aggregateBinding?: Aggregate, sortBinding?: Sort) {
    if (aggregateBinding !== undefined) {
      this.data = aggregateBinding.data;
      this.measurement = aggregateBinding.measurement;

      this.dimension = aggregateBinding.dimension;
      this.dimensionList = aggregateBinding.dimensionList;
    }

    if (sortBinding !== undefined) {
      this.sortType = sortBinding.sortType;
      this.sortProperty = sortBinding.sortProperty;
    }
  }

  getPixie() {
    const sortData = this.getPixieSort();
    return Pixing(sortData, this.dimension, this.measurement, this.dimensionList);
  }

  getPixieSort() {
    return Sorting(this.data, this.sortType, this.sortProperty);
  }

  // Util
}

console.log()