import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare const require: any;
const index = require('../dist/index.js');

describe('Dimenson with Additional Binding- @getPixie Function Test', () => {
  const data = [
    { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 208.0, rework: 0.0 },
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

  it('1AD\t\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('failed', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, failed: 1.9 },
        { x: '2018-12-11', y: 208, failed: 0 },
        { x: '2018-12-12', y: 194, failed: 6.3 },
        { x: '2018-12-12', y: 3010, failed: 10 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('2AD\t\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('failed', TYPE.STRING), new Dimension('projectId', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, failed: '1.9', projectId: 'omakDec10<V03' },
        { x: '2018-12-11', y: 208, failed: '0', projectId: 'omakDec03<V03' },
        { x: '2018-12-12', y: 194, failed: '6.3', projectId: 'omakDec10<V03' },
        { x: '2018-12-12', y: 3010, failed: '10', projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1AD [Default Value:88]\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('value', TYPE.ANY, undefined, '88'), new Dimension('projectId', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, value: '88', projectId: 'omakDec10<V03' },
        { x: '2018-12-11', y: 208, value: '88', projectId: 'omakDec03<V03' },
        { x: '2018-12-12', y: 194, value: '88', projectId: 'omakDec10<V03' },
        { x: '2018-12-12', y: 3010, value: '88', projectId: 'ChrSept' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1AD [Default Value:88 & Rename]\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('value', TYPE.ANY, 'values', '88')];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, values: '88' },
        { x: '2018-12-11', y: 208, values: '88' },
        { x: '2018-12-12', y: 194, values: '88' },
        { x: '2018-12-12', y: 3010, values: '88' }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1AD [Incremental]\t\t\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('value', TYPE.ANY, undefined, undefined, true)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, value: 0 },
        { x: '2018-12-11', y: 208, value: 1 },
        { x: '2018-12-12', y: 194, value: 2 },
        { x: '2018-12-12', y: 3010, value: 3 }
      ]
    };

    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1AD [Incremental & Rename]\t 1M', () => {
    const dimension = new Dimension('date', TYPE.ANY);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE, true)];
    const dimensionList = [new Dimension('value', TYPE.ANY, 'values', undefined, true)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    const expectedData = {
      firstPass: [
        { x: '2018-12-10', y: 208, values: 0 },
        { x: '2018-12-11', y: 208, values: 1 },
        { x: '2018-12-12', y: 194, values: 2 },
        { x: '2018-12-12', y: 3010, values: 3 }
      ]
    };

    expect(pixieData).to.deep.equal(expectedData);
  });
});
