import { expect } from 'chai';
import 'mocha';

declare var require: any;
var index = require('../dist/index.js');
describe('Measurement - @getPixie Function Test', () => {
  var data = [
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

  it('1D 1M', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const measurementList = [new Measurement('measured', CONDITION.NONE)];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: [
        { x: 1517288270000, y: 0.00005306795 },
        { x: 1538283573000, y: 0.00005302792 },
        { x: 1539406636000, y: 0.00005295931 },
        { x: 1540961905000, y: 0.00005306223 },
        { x: 1543553939000, y: 0.00005297646 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 3M', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const measurementList = [
      new Measurement('measured', CONDITION.NONE),
      new Measurement('upperLimit', CONDITION.NONE),
      new Measurement('lowerLimit', CONDITION.NONE)
    ];
    const dataAgg = new Aggregate(data, dimension, measurementList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: [
        { x: 1517288270000, y: 0.00005306795 },
        { x: 1538283573000, y: 0.00005302792 },
        { x: 1539406636000, y: 0.00005295931 },
        { x: 1540961905000, y: 0.00005306223 },
        { x: 1543553939000, y: 0.00005297646 }
      ],
      upperLimit: [
        { x: 1517288270000, y: 0.00006971924 },
        { x: 1538283573000, y: 0.00006971924 },
        { x: 1539406636000, y: 0.00006971924 },
        { x: 1540961905000, y: 0.00006971924 },
        { x: 1543553939000, y: 0.00006971924 }
      ],
      lowerLimit: [
        { x: 1517288270000, y: 0.0000326874 },
        { x: 1538283573000, y: 0.0000326874 },
        { x: 1539406636000, y: 0.0000326874 },
        { x: 1540961905000, y: 0.0000326874 },
        { x: 1543553939000, y: 0.0000326874 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 2M[DL-3]', () => {
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

    var expectedData = {
      measured: [
        { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
        { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125902-1' },
        { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
        { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
        { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125829-1' }
      ],
      upperLimit: [
        { x: 1517288270000, y: 0.00006971924 },
        { x: 1538283573000, y: 0.00006971924 },
        { x: 1539406636000, y: 0.00006971924 },
        { x: 1540961905000, y: 0.00006971924 },
        { x: 1543553939000, y: 0.00006971924 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 2M[DL-3; Float:4]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const measurementList = [new Measurement('measured', CONDITION.NONE, true, 6), new Measurement('upperLimit', CONDITION.NONE, false, 7)];

    const dimensionList = [
      new Dimension('fixtureId', TYPE.NUMBER),
      new Dimension('nominal', TYPE.DOUBLE),
      new Dimension('serialNumber', TYPE.ANY)
    ];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: [
        { x: 1517288270000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
        { x: 1538283573000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125902-1' },
        { x: 1539406636000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
        { x: 1540961905000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
        { x: 1543553939000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125829-1' }
      ],
      upperLimit: [
        { x: 1517288270000, y: 0.0000697 },
        { x: 1538283573000, y: 0.0000697 },
        { x: 1539406636000, y: 0.0000697 },
        { x: 1540961905000, y: 0.0000697 },
        { x: 1543553939000, y: 0.0000697 }
      ]
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  // it('1D 2M[DL-3; Rename]', () => {
  //   const dimension = new Dimension('timestamp', TYPE.DATE);
  //   const measurementList = [
  //     new Measurement('measured', CONDITION.NONE, true, undefined, 'value'),
  //     new Measurement('upperLimit', CONDITION.NONE, false, undefined, 'values')
  //   ];

  //   const dimensionList = [
  //     new Dimension('fixtureId', TYPE.NUMBER),
  //     new Dimension('nominal', TYPE.DOUBLE),
  //     new Dimension('serialNumber', TYPE.ANY)
  //   ];
  //   const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
  //   const sort = new Sort(SORT.ACS, ['timestamp']);
  //   const pixie = new Pixie(dataAgg, sort);
  //   const pixieData = pixie.getPixie();

  //   var expectedData = {
  //     measured: [
  //       { x: 1517288270000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
  //       { x: 1538283573000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125902-1' },
  //       { x: 1539406636000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
  //       { x: 1540961905000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
  //       { x: 1543553939000, y: 0.000053, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125829-1' }
  //     ],
  //     upperLimit: [
  //       { x: 1517288270000, y: 0.0000697 },
  //       { x: 1538283573000, y: 0.0000697 },
  //       { x: 1539406636000, y: 0.0000697 },
  //       { x: 1540961905000, y: 0.0000697 },
  //       { x: 1543553939000, y: 0.0000697 }
  //     ]
  //   };
  //   console.log(pixieData);
  //   expect(pixieData).to.deep.equal(expectedData);
  // });
});
