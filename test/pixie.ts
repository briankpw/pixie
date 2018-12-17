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
  const pixieSumAllBy = index.pixieSumAllBy;
  const pixieSumAllByObject = index.pixieSumAllByObject;
  const pixieAddKey = index.pixieAddKey;
  const pixieReplaceValue = index.pixieReplaceValue;
  const pixieRemoveDuplicate = index.pixieRemoveDuplicate;
  const pixiePluckXIncrement = index.pixiePluckXIncrement;

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

  it('pixieSumBy', () => {
    const pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', 'nominal');
    const expectedData = [
      { x: 'Omak_aa181030125720-1', y: 0.0000694 },
      { x: 'Omak_aa181030125646-1', y: 0.0001388 },
      { x: 'Omak_aa181030125754-1', y: 0.0001388 }
    ];

    // console.log(JSON.stringify(pixieData));
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
});
