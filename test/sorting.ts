import { expect } from 'chai';
import 'mocha';
import * as index from '../dist/index';

describe('Sorting - @getPixieSort Function Test', () => {
  var data = [
    { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.0, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0.0, firstPass: 208.0, rework: 0.0 },
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

    var expectedData = [
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

    var expectedData = [
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

    var expectedData = [
      { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
      { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
      { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
      { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });
});
