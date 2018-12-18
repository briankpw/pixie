import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare var require: any;
var index = require('../dist/index.js');

describe('Pixie ProtoType - @Pixie-ProtoType Function Test', () => {
  const data = [
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
      serialNumber: 'Omak_aa181030125720-1',
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
      isFalse: 'false',
      isAnomaly: null
    },
    {
      timestamp: '2018-11-30T04:58:59.000+00:00',
      serialNumber: 'Omak_aa181030125754-1',
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
      serialNumber: 'Omak_aa181030125646-1',
      testType: 'OmakSmile',
      testUnit: 'Ohm',
      status: 'PASSED',
      upperLimit: '6.971924E-5',
      lowerLimit: '3.26874E-5',
      nominal: '6.94E-5',
      measured: '5.302792E-5',
      fixtureId: '3080',
      isFalse: 'false',
      isAnomaly: null
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

  const dimension = new Dimension('timestamp', TYPE.DATE);
  const measurementList = [new Measurement('measured', CONDITION.NONE, true), new Measurement('upperLimit', CONDITION.NONE)];

  const dimensionList = [
    new Dimension('fixtureId', TYPE.NUMBER),
    new Dimension('nominal', TYPE.DOUBLE),
    new Dimension('serialNumber', TYPE.ANY)
  ];
  const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
  const sort = new Sort(SORT.ACS, ['timestamp']);
  const pixie = new Pixie(dataAgg, sort);
  const pixieData = pixie.getPixie();

  it('pixieGroup', () => {
    const pixieProtoData = pixieData.measured.pixieGroup('serialNumber');
    const expectedData = [
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

    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixieSumGroupBy', () => {
    const pixieProtoData = pixieData.measured.pixieSumGroupBy('serialNumber', 'nominal');
    const expectedData = [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixieSumBy', () => {
    const pixieProtoData = pixieData.measured.pixieSumBy('fixtureId');
    const expectedData = 15400;
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixieSumByEachObject', () => {    
    const pixieProtoData = pixieData.measured.pixieSumByEachObject(['fixtureId', 'x']);
    const expectedData = [
      {
        x: 1517288270000,
        y: 0.00005306795,
        fixtureId: 3080,
        nominal: 0.0000694,
        serialNumber: 'Omak_aa181030125720-1',
        total: 1517288273080
      },
      {
        x: 1538283573000,
        y: 0.00005302792,
        fixtureId: 3080,
        nominal: 0.0000694,
        serialNumber: 'Omak_aa181030125646-1',
        total: 1538283576080
      },
      {
        x: 1539406636000,
        y: 0.00005295931,
        fixtureId: 3080,
        nominal: 0.0000694,
        serialNumber: 'Omak_aa181030125646-1',
        total: 1539406639080
      },
      {
        x: 1540961905000,
        y: 0.00005306223,
        fixtureId: 3080,
        nominal: 0.0000694,
        serialNumber: 'Omak_aa181030125754-1',
        total: 1540961908080
      },
      {
        x: 1543553939000,
        y: 0.00005297646,
        fixtureId: 3080,
        nominal: 0.0000694,
        serialNumber: 'Omak_aa181030125754-1',
        total: 1543553942080
      }
    ];
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixieAddKey', () => {
    const pixieProtoData = pixieData.measured.pixieAddKey('type', 'scatter');
    const expectedData = [
      { type: 'scatter', x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { type: 'scatter', x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { type: 'scatter', x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { type: 'scatter', x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { type: 'scatter', x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixieReplaceValue', () => {
    const pixieProtoData = pixieData.measured.pixieReplaceValue('fixtureId', 1530);
    const expectedData = [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1539406636000, y: 0.00005295931, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { x: 1543553939000, y: 0.00005297646, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  it('pixiePluckIncrement', () => {
    const pixieProtoData = pixieData.measured.pixiePluckIncrement('y');
    const expectedData = [
      { x: 0, y: 0.00005306795 },
      { x: 1, y: 0.00005302792 },
      { x: 2, y: 0.00005295931 },
      { x: 3, y: 0.00005306223 },
      { x: 4, y: 0.00005297646 }
    ];
    expect(pixieProtoData).to.deep.equal(expectedData);
  });

  function logAllProperties(obj: any) {
    console.log(obj);
    if (obj == null) return; // recursive approach
    console.log(Object.getOwnPropertyNames(obj));
    logAllProperties(Object.getPrototypeOf(obj));
  }
});
