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
  private _isSorted: boolean = false;
  private _debug: boolean = false;

  constructor(aggregateBinding?: Aggregate, sortBinding?: Sort, debug: boolean = false) {
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

    this._debug = debug;
  }

  getPixie() {
    const sortData = this.getPixieSort();

    this.debugging('getPixie');
    const pixieData = Pixing(sortData, this._dimension, this._measurement, this._dimensionList);
    this.debugging('getPixie', false);
    return pixieData;
  }

  getPixieSort() {
    this.debugging('getPixieSort');
    let sortData;
    if (this._isSorted) {
      sortData = this._data;
    } else {
      this._isSorted = true;
      sortData = Sorting(this._data, this._sortType, this._sortProperty, this._naturalSort);
    }
    this.debugging('getPixieSort', false);
    return sortData;
  }

  // Debug
  private debugging(title: string, start = true) {
    if (this._debug) {
      if (start) {
        console.time(title);
      } else {
        console.timeEnd(title);
      }
    }
  }
}
