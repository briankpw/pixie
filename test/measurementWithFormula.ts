import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare var require: any;
var index = require('../dist/index.js');

describe('Measurement With Formula- @getPixie Function Test', () => {
  var data = [
    { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.01, rework: 0.0 }
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

  it('PMATH.SUM', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const totalMath = [new PMath('firstPass', PMATH.SUM), new PMath('rework', PMATH.SUM), new PMath('failed', PMATH.NONE)];
    const dimensionList = [new Dimension('projectId', TYPE.ANY)];
    const measurementList = [new Measurement('totalMath', CONDITION.NONE, true, undefined, totalMath)];

    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      totalMath: [
        { x: 1544400000000, y: 213, projectId: 'omakDec10<V03' },
        { x: 1544486400000, y: 292.9, projectId: 'omakDec03<V03' },
        { x: 1544572800000, y: 200.3, projectId: 'omakDec12<V03' },
        { x: 1544572800000, y: 3020.01, projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('PMATH.SUBTRACT', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const subMath = [new PMath('firstPass', PMATH.SUBTRACT), new PMath('rework', PMATH.SUBTRACT), new PMath('failed', PMATH.NONE)];
    const dimensionList = [new Dimension('projectId', TYPE.ANY)];
    const measurementList = [new Measurement('subMath', CONDITION.NONE, true, undefined, subMath)];

    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      subMath: [
        { x: 1544400000000, y: 189.2, projectId: 'omakDec10<V03' },
        { x: 1544486400000, y: 112.9, projectId: 'omakDec03<V03' },
        { x: 1544572800000, y: 187.7, projectId: 'omakDec12<V03' },
        { x: 1544572800000, y: 3000.01, projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('PMATH.MULTIPLE', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const multiMath = [new PMath('firstPass', PMATH.MULTIPLE), new PMath('rework', PMATH.MULTIPLE), new PMath('failed', PMATH.NONE)];
    const dimensionList = [new Dimension('projectId', TYPE.ANY)];
    const measurementList = [new Measurement('multiMath', CONDITION.NONE, true, undefined, multiMath)];

    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      multiMath: [
        { x: 1544400000000, y: 3820.8999999999996, projectId: 'omakDec10<V03' },
        { x: 1544486400000, y: 0, projectId: 'omakDec03<V03' },
        { x: 1544572800000, y: 0, projectId: 'omakDec12<V03' },
        { x: 1544572800000, y: 0, projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('PMATH.DIVIDE', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
    const dimensionList = [new Dimension('projectId', TYPE.ANY)];
    const measurementList = [new Measurement('divideMath', CONDITION.NONE, true, undefined, divideMath)];

    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      divideMath: [
        { x: 1544400000000, y: 105.84210526315789, projectId: 'omakDec10<V03' },
        { x: 1544486400000, y: 2.2544444444444447, projectId: 'omakDec03<V03' },
        { x: 1544572800000, y: 30.793650793650794, projectId: 'omakDec12<V03' },
        { x: 1544572800000, y: 301.00100000000003, projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('PMATH.DIVIDE-Float', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
    const dimensionList = [new Dimension('projectId', TYPE.ANY)];
    const measurementList = [new Measurement('divideMath', CONDITION.NONE, true, 2, divideMath)];

    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      divideMath: [
        { x: 1544400000000, y: 105.84, projectId: 'omakDec10<V03' },
        { x: 1544486400000, y: 2.25, projectId: 'omakDec03<V03' },
        { x: 1544572800000, y: 30.79, projectId: 'omakDec12<V03' },
        { x: 1544572800000, y: 301, projectId: 'ChrSept' }
      ]
    };
    // console.log(pixieData);
    expect(pixieData).to.deep.equal(expectedData);
  });
});
