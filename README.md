[![Build Status](https://travis-ci.com/briankpw/pixie.svg?branch=master)](https://travis-ci.com/briankpw/pixie)
[![Coverage Status](https://coveralls.io/repos/github/briankpw/pixie/badge.svg)](https://coveralls.io/github/briankpw/pixie)
[![npm version](https://badge.fury.io/js/pixie-transformer.svg)](https://badge.fury.io/js/pixie-transformer)
[![Downloads](https://img.shields.io/npm/dt/pixie-transformer.svg)](https://www.npmjs.com/package/pixie-transformer)
[![Dependency Status](https://david-dm.org/briankpw/pixie.svg)](https://david-dm.org/briankpw/pixie) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie?ref=badge_shield)

[![devDependencies Status](https://david-dm.org/briankpw/pixie/dev-status.svg)](https://david-dm.org/briankpw/pixie?type=dev) 
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/briankpw)

# Pixie Transformer

Pixie Transformer is transforming a Raw/Response JSON Payload into your expected JSON Payload. It's make your life easy and convenience without any logic required in your code. You just need to configure Dimension, Measurement (1 or Multiple), Additional Dimension Binding, Condition, Sorting, Mathematic Formula and etc. Generated Pixie Dataset payload mostly used for chart series dataset, map dataset, analysis dataset and etc. Depend on your requirement too...

## Pixie Transformer, Suitable used for:

- Highcharts
- Chart.js
- Amchart
- Any Visualization Tools and Other(s).
- Any Dataset, You Wish to Transform Easily Without Any Logic.

## Library Interface

### Class

- Dimension(column: string, category: TYPE, rename?: string, defaultValue?: any, isIncremental: boolean)
- Measurement(row: string, condition: Array<Condition>, dimensionListBind: boolean, float?: number, formula?: string, rename?: string, defaultValue?: any, isIncremental: boolean)
- Condition(key: string, condition: CONDITION, match: string | number, rename?: string, toUpperCase?: boolean)
- Sort (sortType: SORT, sortProperty?: any)

### Enum

- CONDITION
- TYPE
- SORT

### Feature

- Sorting
- Aggregating
- Pixing

### Pixie Function

- pixieGroup(pixieData: any, groupByKey: string): Array<T>;
- pixieSumGroupBy(pixieData: any, groupByKey: string, sumKey: string): Array<T>;
- pixieSumBy(pixieData: any, sumKey: string): number
- pixieSumByEachObject(pixieData: any, sumByKey: Array<string>): Array<T>;
- pixieAddKey(pixieData: any, key: any, value: any): Array<T>;
- pixieReplaceValue(pixieData: any, key: any, value: any): Array<T>;
- pixiePluckIncrement(pixieData: any, key: any, rename: any = 'x'): Array<T>;

## Installation

```bash
npm install pixie-transformer --save
```

## Usage

### How to Use It

```javascript typescript
import { Dimension, Measurement, Aggregate, Sort, Pixie, SORT, TYPE, CONDITION, Condition } from 'pixie-transformer';
```

First, we need some JSON data

```javascript typescript
const firstDataset = [
  { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
  { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
  { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
  { projectId: 'ChrSept', date: '2018-12-13', failed: 10.0, firstPass: 250.01, rework: 0.0 }
];

const secondDataset = [
  { timestamp: '2018-10-13T04:57:16.000+00:00', serialNumber: 'Omak_aa181030125646-1', status: 'PASSED', measured: '5.295931E-5' },
  { timestamp: '2018-01-30T04:57:50.000+00:00', serialNumber: 'Omak_ab181030125720-1', status: 'PASSED', measured: '5.306795E-5' },
  { timestamp: '2018-10-31T04:58:25.000+00:00', serialNumber: 'Omak_aa181030125754-1', status: 'pass', measured: '5.306223E-5' },
  { timestamp: '2018-11-30T04:58:59.000+00:00', serialNumber: 'Omak_aa181030125829-1', status: 'FAIL', measured: '5.297646E-5' },
  { timestamp: '2018-09-30T04:59:33.000+00:00', serialNumber: 'Omak_aa181030125902-1', status: 'Anomaly', measured: '5.302792E-5' }
];
```

### Dimension & Measurement

```javascript typescript
const dimension = new Dimension('date', TYPE.DATE);
const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
const dataAgg = new Aggregate(firstDataset, dimension, measurementList);
const sort = new Sort(SORT.ACS, ['date']);
const pixie = new Pixie(dataAgg, sort);
const pixieData = pixie.getPixie();
```

Expected Response

```javascript typescript
pixieData = {
  firstPass: [{ x: 1544400000000, y: 201.1 }, 
  { x: 1544486400000, y: 202.9 }, 
  { x: 1544572800000, y: 194 }, 
  { x: 1544659200000, y: 250.01 }]
};
```

[Highcharts Demo](https://jsfiddle.net/yp1tkz25/)

[Amcharts Demo](http://jsfiddle.net/e739nph8/)

### Measurement With Condition & Additional Dimension Binding

```javascript typescript
const dimension = new Dimension('timestamp', TYPE.DATE);
const conditionList = [new Condition('status', CONDITION.CONTAIN, 'pass'), new Condition('status', CONDITION.CONTAIN, 'PASS')];
const measurementList = [new Measurement('measured', conditionList, true)];
const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
const dataAgg = new Aggregate(secondDataset, dimension, measurementList, dimensionList);
const sort = new Sort(SORT.ACS, ['timestamp']);
const pixie = new Pixie(dataAgg, sort);
const pixieData = pixie.getPixie();
```

Expected Response

```javascript typescript
pixieData = {
  measured: {
    pass: [
      { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
      { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
    ],
    Anomaly: [{ x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' }],
    unknown: [{ x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }]
  }
};
```

[Highcharts Demo](https://jsfiddle.net/316Ljsux/)

### Mathematic Formula

```javascript typescript
const dimension = new Dimension('date', TYPE.DATE);
const yieldMath = '(firstPass+rework)/(firstPass+rework+failed)*100';
const dimensionList = [new Dimension('projectId', TYPE.ANY)];
const measurementList = [new Measurement('yieldMath', CONDITION.NONE, true, 2, yieldMath)];
const dataAgg = new Aggregate(firstDataset, dimension, measurementList, dimensionList);
const sort = new Sort(SORT.ACS, ['date']);
const pixie = new Pixie(dataAgg, sort);
const pixieData = pixie.getPixie();
```

Expected Response

```javascript typescript
pixieData = {
  yieldMath: [
    { x: 1544400000000, y: 99.11, projectId: 'omakDec10<V03' },
    { x: 1544486400000, y: 69.27, projectId: 'omakDec03<V03' },
    { x: 1544572800000, y: 96.85, projectId: 'omakDec12<V03' },
    { x: 1544659200000, y: 96.15, projectId: 'ChrSept' }
  ]
};
```

[Highcharts Demo](https://jsfiddle.net/3beqjspm/)

### Pixie Function

```javascript typescript
pixieData = pixie.getPixie();
// pixieData from getPixie
pixieData = {
  measured: [
    { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
    { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
    { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
    { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
    { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
  ]
};
```

Last but not least, you can use Pixie Function to transform new Pixie Dataset which doesn’t in your current payload.

#### pixieGroup(groupByKey: T): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieGroup('serialNumber');
// OR
const pixieProtoData = pixieGroup(rawPixieData.measured, 'serialNumber');
```

Expected Response

```javascript typescript
const pixieProtoData = [
  {
    serialNumber: 'Omak_aa181030125720-1',
    data: [{ x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' }]
  },
  {
    serialNumber: 'Omak_aa181030125646-1',
    data: [
      { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' }
    ]
  },
  {
    serialNumber: 'Omak_aa181030125754-1',
    data: [
      { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ]
  }
];
```

#### pixieSumGroupBy(groupByKey: string, sumByKey: T): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieSumGroupBy('serialNumber', 'nominal');
// OR
const pixieProtoData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', 'nominal');
```

Expected Response

```javascript typescript
const pixieProtoData = [
  { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
  { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
  { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
];
```

#### pixieSumBy(sumByKey: T): number;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieSumBy('fixtureId');
// OR
const pixieProtoData = pixieSumBy(rawPixieData.measured, 'fixtureId');
```

Expected Response

```javascript typescript
const pixieProtoData = 15400;
```

#### pixieSumByEachObject(sumByKey: Array<string>): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieSumByEachObject(['fixtureId', 'x']);
// OR
const pixieProtoData = pixieSumByEachObject(rawPixieData.measured, ['fixtureId', 'x']);
```

Expected Response

```javascript typescript
const pixieProtoData = [
  { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1', total: 1517288273080  },
  { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1', total: 1538283576080  },
  { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1', total: 1539406639080  },
  { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1', total: 1540961908080  },
  { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1', total: 1543553942080  }
];
```

#### pixieAddKey(key: T, value: T): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieAddKey('type', 'scatter');
// OR
const pixieProtoData = pixieAddKey(rawPixieData.measured, 'type', 'scatter');
```

Expected Response

```javascript typescript
const pixieProtoData = [
  { type: 'scatter', x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
  { type: 'scatter', x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
  { type: 'scatter', x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
  { type: 'scatter', x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
  { type: 'scatter', x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
];
```

#### pixieReplaceValue(key: T, value: T): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixieReplaceValue('fixtureId', 1530);
// OR
const pixieProtoData = pixieReplaceValue(rawPixieData.measured, 'fixtureId', 1530);
```

Expected Response

```javascript typescript
const pixieProtoData = [
  { x: 1517288270000, y: 0.00005306795, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
  { x: 1538283573000, y: 0.00005302792, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
  { x: 1539406636000, y: 0.00005295931, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
  { x: 1540961905000, y: 0.00005306223, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
  { x: 1543553939000, y: 0.00005297646, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
];
```

#### pixiePluckIncrement(key: T, renameX?: T): Array<T>;

```javascript typescript
const pixieProtoData = pixieData.measured.pixiePluckIncrement('y');
// OR
const pixieProtoData = pixiePluckIncrement(rawPixieData.measured, 'y');
```

Expected Response

```javascript typescript
const pixieProtoData = [
  { x: 0, y: 0.00005306795 },
  { x: 1, y: 0.00005302792 },
  { x: 2, y: 0.00005295931 },
  { x: 3, y: 0.00005306223 },
  { x: 4, y: 0.00005297646 }
];
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie?ref=badge_large)