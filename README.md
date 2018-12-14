[![Build Status](https://travis-ci.com/briankpw/pixie.svg?branch=master)](https://travis-ci.com/briankpw/pixie)
[![Coverage Status](https://coveralls.io/repos/github/briankpw/pixie/badge.svg?branch=master)](https://coveralls.io/github/briankpw/pixie?branch=master)
[![npm version](https://badge.fury.io/js/pixie-transformer.svg)](https://badge.fury.io/js/pixie-transformer)

# Pixie Transformer
Pixie Transformer is a Raw JSON Payload transform into your expected JSON Payload. Its make your life easy and convenience without any logical required in your code. You just need to configure Dimension, Measurement(1 or Multiple), Additional Dimension Binding, Filter, Condition, Sorting, Mathematic Formula and etc. The generated payload mostly used for chart series dataset, map dataset, analysis dataset and etc. Depend on your requirement too...

## Pixie Transformer, Suitable used for:
- Highcharts
- Chart.js
- Amchart
- Any Visualization Tools and Other(s).
- Any Dataset Wish To Transfer Easily Wihout Any Logic.

## Library Interface
### Class
- Dimension
- Measurement
- Condition
- PMath

### Enum
- CONDITION
- PMATH
- TYPE
- SORT

### Features 
- Sorting
- Aggregating
- Pixing

## Installation
```bash
npm install pixie-transformer
```

## Usage
### How to Use It

```javascript typescript
import * from pixie-transformer
```

First, we need some JSON data
```java
const firstDataset = [
    { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.01, rework: 0.0 }
  ];
  
const secondDataset = [
    {
      timestamp: '2018-10-13T04:57:16.000+00:00',
      serialNumber: 'Omak_aa181030125646-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'PASSED',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.295931E-5',
      fixtureId: '3080',
      isFalse: 'false',
      isAnomaly: null
    },
    {
      timestamp: '2018-01-30T04:57:50.000+00:00',
      serialNumber: 'Omak_ab181030125720-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'PASSED',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.306795E-5',
      fixtureId: '3080',
      isFalse: 'false',
      isAnomaly: null
    },
    {
      timestamp: '2018-10-31T04:58:25.000+00:00',
      serialNumber: 'Omak_aa181030125754-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'pass',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.306223E-5',
      fixtureId: '3080',
      failedNodes: null,
      isFalse: 'true',
      isAnomaly: null
    },
    {
      timestamp: '2018-11-30T04:58:59.000+00:00',
      serialNumber: 'Omak_aa181030125829-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'FAIL',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.297646E-5',
      fixtureId: '3080',
      isFalse: 'false',
      isAnomaly: 'true'
    },
    {
      timestamp: '2018-09-30T04:59:33.000+00:00',
      serialNumber: 'Omak_aa181030125902-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'Anomaly',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.302792E-5',
      fixtureId: '3080',
      isFalse: 'false',
      isAnomaly: null
    }
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
 pixieData = { firstPass:
   [ { x: 1544400000000, y: 201.1 },
     { x: 1544486400000, y: 202.9 },
     { x: 1544572800000, y: 194 },
     { x: 1544572800000, y: 3010.01 } ] }
```

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
        PASS: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' }
        ],
        unknown: [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        pass: [{ x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }]
      }
    };
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
