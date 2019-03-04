import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare const require: any;
const index = require('../dist/index.js');

describe('Pixie Function - @Pixie Function Test', () => {
  const rawPixieData = {
    measured: [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ]
  };

  const pixieGroup = index.pixieGroup;
  const pixieSumGroupBy = index.pixieSumGroupBy;
  const pixieSumBy = index.pixieSumBy;
  const pixieSumByEachObject = index.pixieSumByEachObject;
  const pixieAddKey = index.pixieAddKey;
  const pixieReplaceValue = index.pixieReplaceValue;
  const pixiePluckIncrement = index.pixiePluckIncrement;

  it('pixieGroup', () => {
    const pixieData = pixieGroup(rawPixieData.measured, 'serialNumber');
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

    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieSumGroupBy-String', () => {
    const pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', 'nominal');
    const expectedData = [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieSumGroupBy-Array', () => {
    const pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', ['nominal','fixtureId']);
    const expectedData = [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 6160, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 6160, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieSumBy', () => {
    const pixieData = pixieSumBy(rawPixieData.measured, 'fixtureId');
    const expectedData = 15400;
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieSumByEachObject', () => {
    const pixieData = pixieSumByEachObject(rawPixieData.measured, ['fixtureId', 'x']);
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
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieAddKey', () => {
    const pixieData = pixieAddKey(rawPixieData.measured, 'type', 'scatter');
    const expectedData = [
      { type: 'scatter', x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { type: 'scatter', x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { type: 'scatter', x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { type: 'scatter', x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { type: 'scatter', x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixieReplaceValue', () => {
    const pixieData = pixieReplaceValue(rawPixieData.measured, 'fixtureId', 1530);
    const expectedData = [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1539406636000, y: 0.00005295931, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { x: 1543553939000, y: 0.00005297646, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });

  it('pixiePluckIncrement', () => {
    const pixieData = pixiePluckIncrement(rawPixieData.measured, 'y');
    const expectedData = [
      { x: 0, y: 0.00005306795 },
      { x: 1, y: 0.00005302792 },
      { x: 2, y: 0.00005295931 },
      { x: 3, y: 0.00005306223 },
      { x: 4, y: 0.00005297646 }
    ];
    expect(pixieData).to.deep.equal(expectedData);
  });
});
