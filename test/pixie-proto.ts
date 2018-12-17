import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare var require: any;
var index = require('../dist/index.js');

describe('Pixie ProtoType - @Pixie-ProtoType Function Test', () => {
  const rawPixieData = {
    measured: [
      { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
      { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
      { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
      { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
    ]
  };

  const data = [
    { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.01, rework: 0.0 }
  ];
  const TYPE = index.TYPE;
  const SORT = index.SORT;
  const CONDITION = index.CONDITION;
  const Dimension = index.Dimension;
  const Measurement = index.Measurement;
  const Aggregate = index.Aggregate;
  const Sort = index.Sort;
  const Pixie = index.Pixie;
  // it('1D 3M', () => {
  //   const pixie=new Pixie();
    
  //   const pixieDatas = pixie.getPixie();
  //   const pixieData =index.pixieAddKey(rawPixieData.measured,'serialNumbers', 'as');
  //   var expectedData;

  //   console.log(pixieData);
  //   expect(pixieData).to.deep.equal(expectedData);
  // });

  // it('PMATH Infinity', () => {
  //   const dimension = new Dimension('date', TYPE.DATE);
  //   const yieldMath = '(firstPass+rework)/rework';
  //   // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
  //   const dimensionList = [new Dimension('projectId', TYPE.ANY)];
  //   const measurementList = [new Measurement('yieldMath', CONDITION.NONE, true, undefined, yieldMath)];

  //   const dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
  //   const sort = new Sort(SORT.ACS, ['date']);
  //   const pixie = new Pixie(dataAgg, sort);
  //   const pixieData = pixie.getPixie();

  //   const expectedData = {
  //     yieldMath: [
  //       { x: 1544400000000, y: 21.11, projectId: 'omakDec10<V03' },
  //       { x: 1544486400000, y: Infinity, projectId: 'omakDec03<V03' },
  //       { x: 1544572800000, y: Infinity, projectId: 'omakDec12<V03' },
  //       { x: 1544572800000, y: Infinity, projectId: 'ChrSept' }
  //     ]
  //   };
  //   console.log(pixieData.yieldMath.pixieAddKey("aa","aas"))
  //   expect(pixieData).to.deep.equal(expectedData);
  // });

  function logAllProperties(obj: any) {
    console.log(obj);
    if (obj == null) return; // recursive approach
    console.log(Object.getOwnPropertyNames(obj));
    logAllProperties(Object.getPrototypeOf(obj));
  }
});
