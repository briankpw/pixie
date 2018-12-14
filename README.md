[![Build Status](https://travis-ci.com/briankpw/pixie.svg?branch=master)](https://travis-ci.com/briankpw/pixie)
[![Coverage Status](https://coveralls.io/repos/github/briankpw/pixie/badge.svg?branch=master)](https://coveralls.io/github/briankpw/pixie?branch=master)
[![npm version](https://badge.fury.io/js/pixie-transformer.svg)](https://badge.fury.io/js/pixie-transformer)

# Pixie
## Getting Starter
Pixie Support 

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

## Environment 

## Installation
```bash
npm install pixie-transformer
```

## Usage
### How to Use It

```javascript typescript
import * from pixie-transformer
```

Raw Data
```
const data = [
    { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 208.0, rework: 0.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0.0, firstPass: 208.0, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.0, rework: 0.0 }
  ];
```

### Dimension & Measurement 
```javascript typescript
 const dimension = new Dimension('date', TYPE.ANY);
 const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
 const dataAgg = new Aggregate(data, dimension, measurementList);
 const sort = new Sort(SORT.ACS, ['date']);
 const pixie = new Pixie(dataAgg, sort);
 const pixieData = pixie.getPixie();
```

Response
```javascript typescript
  
 pixieData = {
      firstPass: [{ x: '2018-12-10', y: 208 }, { x: '2018-12-11', y: 208 }, { x: '2018-12-12', y: 194 }, { x: '2018-12-12', y: 3010 }]
 };
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
