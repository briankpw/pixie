import * as _ from 'underscore';
import { AsArray } from '../util/tool';
export enum SORT {
  NONE,
  ACS,
  DESC
}

export interface SortInterface {
  sortType: SORT;
  sortProperty?: Array<string>;
}

export class Sort implements SortInterface {
  constructor(public sortType: SORT, public sortProperty?: any) {
    this.sortProperty = AsArray(sortProperty);
  }
}

function Sorting(data: any, sortType: SORT, sortProperty?:any) {
  switch (sortType) {
    case SORT.NONE:
      return data;
    case SORT.ACS: {
      return toSort(data, sortProperty);
    }
    case SORT.DESC: {
      return toSort(data, sortProperty).reverse();
    }
  }
}

function toSort(data: any, sortProperty?: any) {
  let sortData = data;
  _.each(sortProperty.reverse(), (d: any) => {
    sortData = _.sortBy(sortData, d);
  });
  return sortData;
}

export { Sorting };
