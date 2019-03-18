import * as _ from 'underscore';
import { AsArray } from '../util/tool';
export enum SORT {
  NONE,
  ACS,
  DESC
}

import { NaturalSort } from '../util/nature-sort';

export interface SortInterface {
  sortType: SORT;
  sortProperty?: Array<string>;
  naturalSort?: boolean;
}

export class Sort implements SortInterface {
  constructor(public sortType: SORT, public sortProperty?: any, public naturalSort?: boolean) {
    this.sortProperty = AsArray(sortProperty);
  }
}

function Sorting(data: any, sortType: SORT, sortProperty?: any, naturalSort?: boolean) {
  switch (sortType) {
    case SORT.NONE:
      return data;
    case SORT.ACS: {
      return toSort(data, sortProperty, naturalSort);
    }
    case SORT.DESC: {
      return toSort(data, sortProperty, naturalSort).reverse();
    }
  }
}

function toSort(data: any, sortProperty?: any, naturalSort?: Boolean) {
  let sortData = data;
  if (naturalSort == undefined) {
    naturalSort = false;
  }

  _.each(sortProperty.reverse(), (d: any) => {
    if (naturalSort) {
      sortData = sortData.sort((a: any, b: any) => {
        return NaturalSort(a, b, d);
      });
    } else {
      sortData = _.sortBy(sortData, d);
    }
  });
  return sortData;
}

export { Sorting };
