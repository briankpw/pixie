"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index = require('../dist/index.js');
describe('Sorting - @getPixieSort Function Test', function () {
    var data = [
        { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.0, firstPass: 194.0, rework: 0.0 },
        { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0.0, firstPass: 208.0, rework: 0.0 },
        { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0.0, firstPass: 208.0, rework: 0.0 },
        { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.0, rework: 0.0 }
    ];
    var TYPE = index.TYPE;
    var SORT = index.SORT;
    var CONDITION = index.CONDITION;
    var Dimension = index.Dimension;
    var Measurement = index.Measurement;
    var Aggregate = index.Aggregate;
    var Sort = index.Sort;
    var Pixie = index.Pixie;
    it('Sort By Date [NONE]', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        var dataAgg = new Aggregate(data, dimension, measurementList);
        var sort = new Sort(SORT.NONE, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixieSort();
        chai_1.expect(pixieData).to.deep.equal(data);
    });
    it('Sort By Date [ACS]', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        var dataAgg = new Aggregate(data, dimension, measurementList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixieSort();
        var expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date [DESC]', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        var dataAgg = new Aggregate(data, dimension, measurementList);
        var sort = new Sort(SORT.DESC, 'date');
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixieSort();
        var expectedData = [
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date & Project [ACS]', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        var dataAgg = new Aggregate(data, dimension, measurementList);
        var sort = new Sort(SORT.ACS, ['date', 'projectId']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixieSort();
        var expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date & Project [DESC]', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        var dataAgg = new Aggregate(data, dimension, measurementList);
        var sort = new Sort(SORT.DESC, ['date', 'projectId']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixieSort();
        var expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
});
