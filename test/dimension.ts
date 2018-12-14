import { expect } from 'chai';
import 'mocha';
import * as index from '../dist/index';

describe('Dimenson - @getPixie Function Test', () => {
  var data = [
    { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 208.0, rework: 0.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0.0, firstPass: 208.0, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.0, rework: 0.0 }
  ];

  var TYPE = index.TYPE;
  var SORT = index.SORT;
  var CONDITION = index.CONDITION;
  var PMATH = index.PMATH;
  var Dimension = index.Dimension;
  var Measurement = index.Measurement;
  var PMath = index.PMath;
  var Aggregate = index.Aggregate;
  var Sort = index.Sort;
  var Pixie = index.Pixie;

  it('1D[T:ANY]\t\t\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      firstPass: [{ x: '2018-12-10', y: 208 }, { x: '2018-12-11', y: 208 }, { x: '2018-12-12', y: 194 }, { x: '2018-12-12', y: 3010 }]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:NUMBER]\t\t\t\t 1M', () => {
    const dimension = new Dimension('failed', TYPE.NUMBER);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['failed']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = { firstPass: [{ x: 0, y: 208 }, { x: 1, y: 208 }, { x: 6, y: 194 }, { x: 10, y: 3010 }] };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DOUBLE]\t\t\t\t 1M', () => {
    const dimension = new Dimension('failed', TYPE.DOUBLE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['failed']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = { firstPass: [{ x: 0, y: 208 }, { x: 1.9, y: 208 }, { x: 6.3, y: 194 }, { x: 10, y: 3010 }] };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE]\t\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      firstPass: [{ x: 1544400000000, y: 208 }, { x: 1544486400000, y: 208 }, { x: 1544572800000, y: 194 }, { x: 1544572800000, y: 3010 }]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:STRING]\t\t\t\t 1M', () => {
    const dimension = new Dimension('failed', TYPE.STRING);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['failed']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = { firstPass: [{ x: '0', y: 208 }, { x: '1.9', y: 208 }, { x: '6.3', y: 194 }, { x: '10', y: 3010 }] };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE, Rename]\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.DATE, 'day');
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      firstPass: [
        { day: 1544400000000, y: 208 },
        { day: 1544486400000, y: 208 },
        { day: 1544572800000, y: 194 },
        { day: 1544572800000, y: 3010 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:ANY, defaultValue:88]\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY, undefined, 88);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      firstPass: [{ x: 88, y: 208 }, { x: 88, y: 208 }, { x: 88, y: 194 }, { x: 88, y: 3010 }]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE, defaultValue:"2018-08-08"]\t 1M', () => {
    const dimension = new Dimension('date', TYPE.DATE, undefined, '2018-08-08');
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      firstPass: [{ x: 1533686400000, y: 208 }, { x: 1533686400000, y: 208 }, { x: 1533686400000, y: 194 }, { x: 1533686400000, y: 3010 }]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D[T:DATE, isIncremental:true]\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.DATE, undefined, undefined, true);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = { firstPass: [{ x: 0, y: 208 }, { x: 1, y: 208 }, { x: 2, y: 194 }, { x: 3, y: 3010 }] };
    expect(pixieData).to.deep.equal(expectedData);
  });
});
