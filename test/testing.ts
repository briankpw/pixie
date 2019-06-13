import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare const require: any;
const index = require('../dist/index.js');

describe('Testing', () => {
  const data = [
    {
      equipmentName: 'i3070SGH829S1TB',
      failed: 5.0,
      firstPass: 89.0,
      rework: 35.0,
      date: null,
      pass: 124.0,
      fail: 5.0,
      fixtureId: '511',
      firstPassYield: 68.99,
      finalYield: 96.12
    },
    {
      equipmentName: 'i3070SGH829S1TB',
      failed: 1.0,
      firstPass: 22.0,
      rework: 5.0,
      date: null,
      pass: 27.0,
      fail: 1.0,
      fixtureId: '127',
      firstPassYield: 78.57,
      finalYield: 96.43
    },
    {
      equipmentName: 'i3070SGH829S1T1',
      failed: 7.0,
      firstPass: 24.0,
      rework: 9.0,
      date: null,
      pass: 33.0,
      fail: 7.0,
      fixtureId: '511',
      firstPassYield: 60.0,
      finalYield: 82.5
    },
    {
      equipmentName: 'i3070SGH829S1T1',
      failed: 3.0,
      firstPass: 12.0,
      rework: 13.0,
      date: null,
      pass: 25.0,
      fail: 3.0,
      fixtureId: '127',
      firstPassYield: 42.86,
      finalYield: 89.29
    },
    {
      equipmentName: 'i3070SGH829S1SC',
      failed: 1.0,
      firstPass: 0.0,
      rework: 0.0,
      date: null,
      pass: 0.0,
      fail: 1.0,
      fixtureId: '511',
      firstPassYield: 0.0,
      finalYield: 0.0
    },
    {
      equipmentName: 'i3070SGH828RWQQ',
      failed: 3.0,
      firstPass: 1.0,
      rework: 9.0,
      date: null,
      pass: 10.0,
      fail: 3.0,
      fixtureId: '511',
      firstPassYield: 7.69,
      finalYield: 76.92
    },
    {
      equipmentName: 'i3070SGH828RWQQ',
      failed: 1.0,
      firstPass: 0.0,
      rework: 0.0,
      date: null,
      pass: 0.0,
      fail: 1.0,
      fixtureId: '127',
      firstPassYield: 0.0,
      finalYield: 0.0
    }
  ];

  const TYPE = index.TYPE;
  const SORT = index.SORT;
  const CONDITION = index.CONDITION;
  const Dimension = index.Dimension;
  const Measurement = index.Measurement;
  const Aggregate = index.Aggregate;
  const Sort = index.Sort;
  const Pixie = index.Pixie;

  it('Sorting Testing with Two Pixie Call', () => {
    const dimension = new Dimension('x', TYPE.NUMBER, undefined, undefined, true);

    const measurementList = [
      new Measurement('firstPass', CONDITION.NONE, true),
      new Measurement('rework', CONDITION.NONE, true),
      new Measurement('failed', CONDITION.NONE, false),
      new Measurement('firstPassYield', CONDITION.NONE, false),
      new Measurement('finalYield', CONDITION.NONE, false)
    ];

    const dimensionList = [new Dimension('equipmentName', TYPE.ANY), new Dimension('fixtureId', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sortProperty = ['equipmentName', 'fixtureId'];

    const sort = new Sort(SORT.ACS, sortProperty, true);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();
    const pixieSortData = pixie.getPixieSort();

    const expectedData = [
      {
        equipmentName: 'i3070SGH828RWQQ',
        failed: 1,
        firstPass: 0,
        rework: 0,
        date: null,
        pass: 0,
        fail: 1,
        fixtureId: '127',
        firstPassYield: 0,
        finalYield: 0
      },
      {
        equipmentName: 'i3070SGH828RWQQ',
        failed: 3,
        firstPass: 1,
        rework: 9,
        date: null,
        pass: 10,
        fail: 3,
        fixtureId: '511',
        firstPassYield: 7.69,
        finalYield: 76.92
      },
      {
        equipmentName: 'i3070SGH829S1SC',
        failed: 1,
        firstPass: 0,
        rework: 0,
        date: null,
        pass: 0,
        fail: 1,
        fixtureId: '511',
        firstPassYield: 0,
        finalYield: 0
      },
      {
        equipmentName: 'i3070SGH829S1T1',
        failed: 3,
        firstPass: 12,
        rework: 13,
        date: null,
        pass: 25,
        fail: 3,
        fixtureId: '127',
        firstPassYield: 42.86,
        finalYield: 89.29
      },
      {
        equipmentName: 'i3070SGH829S1T1',
        failed: 7,
        firstPass: 24,
        rework: 9,
        date: null,
        pass: 33,
        fail: 7,
        fixtureId: '511',
        firstPassYield: 60,
        finalYield: 82.5
      },
      {
        equipmentName: 'i3070SGH829S1TB',
        failed: 1,
        firstPass: 22,
        rework: 5,
        date: null,
        pass: 27,
        fail: 1,
        fixtureId: '127',
        firstPassYield: 78.57,
        finalYield: 96.43
      },
      {
        equipmentName: 'i3070SGH829S1TB',
        failed: 5,
        firstPass: 89,
        rework: 35,
        date: null,
        pass: 124,
        fail: 5,
        fixtureId: '511',
        firstPassYield: 68.99,
        finalYield: 96.12
      }
    ];
    expect(pixieSortData).to.deep.equal(expectedData);
  });
});
