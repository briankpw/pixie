import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare const require: any;
const index = require('../dist/index.js');

describe('getPixie - @Normal Function Test', () => {
  const data = [
    { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.0, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0.0, firstPass: 208.0, rework: 0.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0.0, firstPass: 208.0, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.0, rework: 0.0 }
  ];

  const TYPE = index.TYPE;
  const SORT = index.SORT;
  const CONDITION = index.CONDITION;
  const Dimension = index.Dimension;
  const Measurement = index.Measurement;
  const Aggregate = index.Aggregate;
  const Sort = index.Sort;
  const Pixie = index.Pixie;

  it('1D[T:DATE] 1M- Sort[ACS]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [{ x: 1544400000000, y: 208 }, { x: 1544486400000, y: 208 }, { x: 1544572800000, y: 194 }, { x: 1544572800000, y: 3010 }]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE] 3M- Sort[ACS]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [
      new Measurement('firstPass', CONDITION.NONE),
      new Measurement('rework', CONDITION.NONE),
      new Measurement('failed', CONDITION.NONE)
    ];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [{ x: 1544400000000, y: 208 }, { x: 1544486400000, y: 208 }, { x: 1544572800000, y: 194 }, { x: 1544572800000, y: 3010 }],
      rework: [{ x: 1544400000000, y: 0 }, { x: 1544486400000, y: 0 }, { x: 1544572800000, y: 0 }, { x: 1544572800000, y: 0 }],
      failed: [{ x: 1544400000000, y: 0 }, { x: 1544486400000, y: 0 }, { x: 1544572800000, y: 6 }, { x: 1544572800000, y: 10 }]
    };

    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE, R] 3M[2R]- Sort[ACS]', () => {
    const dimension = new Dimension('date', TYPE.DATE, 'day');
    const measurementList = [
      new Measurement('firstPass', CONDITION.NONE),
      new Measurement('rework', CONDITION.NONE, false, undefined, undefined, 'obj'),
      new Measurement('failed', CONDITION.NONE, false, undefined, undefined, 'obj2')
    ];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { day: 1544400000000, y: 208 },
        { day: 1544486400000, y: 208 },
        { day: 1544572800000, y: 194 },
        { day: 1544572800000, y: 3010 }
      ],
      rework: [
        { day: 1544400000000, obj: 0 },
        { day: 1544486400000, obj: 0 },
        { day: 1544572800000, obj: 0 },
        { day: 1544572800000, obj: 0 }
      ],
      failed: [
        { day: 1544400000000, obj2: 0 },
        { day: 1544486400000, obj2: 0 },
        { day: 1544572800000, obj2: 6 },
        { day: 1544572800000, obj2: 10 }
      ]
    };
    // console.log(pixieData);
    expect(pixieData).to.deep.equal(expectedData);
  });
});
