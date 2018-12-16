import { expect } from 'chai';
import 'mocha';
// import * as index from '../dist/index';
declare var require: any;
var index = require('../dist/index.js');

describe('Measurement With Formula- @getPixie Function Test', () => {
  var data = [
    { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
    { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
    { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
    { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.01, rework: 0.0 }
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

});
