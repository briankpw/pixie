import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare const require: any;
const index = require('../dist/index.js');

describe('Sorting - @getPixieSort Function Test', () => {
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

  it('Sort By Date [NONE]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.NONE, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixieSort();
    expect(pixieData).to.deep.equal(data);
  });

  it('Sort By Date [ACS]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixieSort();

    const expectedData = [
      { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
      { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('Sort By Date & Project [ACS]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['date', 'projectId']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixieSort();

    const expectedData = [
      { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
      { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('Sort By Date & Project [DESC]', () => {
    const dimension = new Dimension('date', TYPE.DATE);
    const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.DESC, ['date', 'projectId']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixieSort();

    const expectedData = [
      { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
      { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
      { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });
});
