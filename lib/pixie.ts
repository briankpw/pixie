import { Sort, SORT, Sorting } from './interface/sort';
import { Aggregate, Dimension, Measurement, TYPE, Pixing } from './interface/aggregate';

export class Pixie {
  private _data: any;
  private _measurement: Array<Measurement> = [];

  private _dimension: Dimension = new Dimension('null', TYPE.ANY);
  private _dimensionList?: Array<Dimension>;

  private _sortType: SORT = SORT.NONE;
  private _sortProperty: Array<string> | undefined;
  private _naturalSort: boolean | undefined;

  constructor(aggregateBinding?: Aggregate, sortBinding?: Sort) {
    if (aggregateBinding !== undefined) {
      this._data = aggregateBinding.data;
      this._measurement = aggregateBinding.measurement;

      this._dimension = aggregateBinding.dimension;
      this._dimensionList = aggregateBinding.dimensionList;
    }

    if (sortBinding !== undefined) {
      this._sortType = sortBinding.sortType;
      this._sortProperty = sortBinding.sortProperty;
      this._naturalSort = sortBinding.naturalSort;
    }
  }

  getPixie() {
    const sortData = this.getPixieSort();
    return Pixing(sortData, this._dimension, this._measurement, this._dimensionList);
  }

  getPixieSort() {
    return Sorting(this._data, this._sortType, this._sortProperty, this._naturalSort);
  }
}
