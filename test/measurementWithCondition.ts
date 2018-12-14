import { expect } from 'chai';
import 'mocha';
import * as index from '../dist/index';

describe('Measurement With Condition- @getPixie Function Test', () => {
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
      serialNumber: 'Omak_ab181030125720-1',
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
      isFalse: 'true',
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
      status: 'Anomaly',
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
  var PMath = index.PMath;
  var PMATH = index.PMATH;
  var Dimension = index.Dimension;
  var Measurement = index.Measurement;
  var Aggregate = index.Aggregate;
  var Condition = index.Condition;
  var Sort = index.Sort;
  var Pixie = index.Pixie;

  it('1D 1M[CONDITION.EQUAL & Rename]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('isFalse', CONDITION.EQUAL, 'true', 'isFalseX')];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        unknown: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        isFalseX: [{ x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.NOTEQUAL & Rename]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('isFalse', CONDITION.NOTEQUAL, 'true', 'isNotFalse')];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        isNotFalse: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        unknown: [{ x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.CONTAIN]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('status', CONDITION.CONTAIN, 'pass'), new Condition('status', CONDITION.CONTAIN, 'PASS')];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        PASS: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' }
        ],
        unknown: [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        pass: [{ x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.STARTWITH]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [
      new Condition('serialNumber', CONDITION.STARTWITH, 'Omak_ab'),
      new Condition('serialNumber', CONDITION.STARTWITH, 'Omak_a')
    ];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        Omak_ab: [{ x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' }],
        Omak_a: [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.ENDWITH]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [
      new Condition('serialNumber', CONDITION.ENDWITH, '902-1'),
      new Condition('serialNumber', CONDITION.ENDWITH, '-1')
    ];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        '-1': [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        '902-1': [{ x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.LESSTHAN]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('measured', CONDITION.LESSTHAN, 0.00005302792)];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        unknown: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
        ],
        '0.00005302792': [
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.LESSTHAN OR EQUAL]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('measured', CONDITION.LESSTHANOREQUAL, 0.00005302792)];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        unknown: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
        ],
        '0.00005302792': [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.MORETHAN]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('measured', CONDITION.MORETHAN, 0.00005302792)];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        '0.00005302792': [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
        ],
        unknown: [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[CONDITION.MORETHAN OR EQUAL]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [new Condition('measured', CONDITION.MORETHANOREQUAL, 0.00005302792)];
    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        '0.00005302792': [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
        ],
        unknown: [
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[Mutliple CONDITION & Rename]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [
      new Condition('isFalse', CONDITION.EQUAL, 'true', 'isFalseX'),
      new Condition('isAnomaly', CONDITION.EQUAL, 'true', 'anomaly'),
      new Condition('status', CONDITION.EQUAL, 'Anomaly', 'anomaly'),
      new Condition('status', CONDITION.CONTAIN, 'PASS', 'pass'),
      new Condition('status', CONDITION.CONTAIN, 'Pass', 'pass'),
      new Condition('status', CONDITION.CONTAIN, 'pass', 'pass')
    ];

    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        pass: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' }
        ],
        anomaly: [
          { x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' },
          { x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }
        ],
        isFalseX: [{ x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('1D 1M[Mutliple CONDITION & Rename & ToUpperCase]', () => {
    const dimension = new Dimension('timestamp', TYPE.DATE);
    const conditionList = [
      new Condition('status', CONDITION.EQUAL, 'anomaly', 'anomaly', false),
      new Condition('status', CONDITION.CONTAIN, 'PASS', 'pass', true)
    ];

    const measurementList = [new Measurement('measured', conditionList, true)];
    const dimensionList = [new Dimension('serialNumber', TYPE.ANY)];
    const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    const sort = new Sort(SORT.ACS, ['timestamp']);
    const pixie = new Pixie(dataAgg, sort);
    const pixieData = pixie.getPixie();

    var expectedData = {
      measured: {
        pass: [
          { x: 1517288270000, y: 0.00005306795, serialNumber: 'Omak_ab181030125720-1' },
          { x: 1539406636000, y: 0.00005295931, serialNumber: 'Omak_aa181030125646-1' },
          { x: 1540961905000, y: 0.00005306223, serialNumber: 'Omak_aa181030125754-1' }
        ],
        anomaly: [{ x: 1538283573000, y: 0.00005302792, serialNumber: 'Omak_aa181030125902-1' }],
        unknown: [{ x: 1543553939000, y: 0.00005297646, serialNumber: 'Omak_aa181030125829-1' }]
      }
    };
    expect(pixieData).to.deep.equal(expectedData);
  });
});
