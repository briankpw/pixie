"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index = require('../dist/index.js');
describe('Measurement With Formula- @getPixie Function Test', function () {
    var data = [
        { projectId: 'omakDec12<V03', date: '2018-12-12', failed: 6.3, firstPass: 194.0, rework: 0.0 },
        { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 1.9, firstPass: 201.1, rework: 10.0 },
        { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 90.0, firstPass: 202.9, rework: 0.0 },
        { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.01, rework: 0.0 }
    ];
    var TYPE = index.TYPE;
    var SORT = index.SORT;
    var CONDITION = index.CONDITION;
    var Dimension = index.Dimension;
    var Measurement = index.Measurement;
    var Aggregate = index.Aggregate;
    var Sort = index.Sort;
    var Pixie = index.Pixie;
    it('PMATH.SUM', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var totalMath = 'firstPass+rework+failed';
        // [new PMath('firstPass', PMATH.SUM), new PMath('rework', PMATH.SUM), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('totalMath', CONDITION.NONE, true, undefined, totalMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            totalMath: [
                { x: 1544400000000, y: 213, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 292.9, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 200.3, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 3020.01, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH.SUBTRACT', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var subMath = 'firstPass-rework-failed';
        // const subMath = [new PMath('firstPass', PMATH.SUBTRACT), new PMath('rework', PMATH.SUBTRACT), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('subMath', CONDITION.NONE, true, undefined, subMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            subMath: [
                { x: 1544400000000, y: 189.2, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 112.9, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 187.7, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 3000.01, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH.MULTIPLE', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var multiMath = 'firstPass*rework*failed';
        // const multiMath = [new PMath('firstPass', PMATH.MULTIPLE), new PMath('rework', PMATH.MULTIPLE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('multiMath', CONDITION.NONE, true, undefined, multiMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            multiMath: [
                { x: 1544400000000, y: 3820.8999999999996, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 0, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 0, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 0, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH.DIVIDE', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var divideMath = 'firstPass/failed';
        // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('divideMath', CONDITION.NONE, true, undefined, divideMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            divideMath: [
                { x: 1544400000000, y: 105.84210526315789, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 2.2544444444444447, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 30.793650793650794, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 301.00100000000003, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH.DIVIDE-Float', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var divideMath = 'firstPass/failed';
        // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('divideMath', CONDITION.NONE, true, 2, divideMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            divideMath: [
                { x: 1544400000000, y: 105.84, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 2.25, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 30.79, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 301, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH Complicated & Fixed Value', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var yieldMath = '(firstPass+rework)/(firstPass+rework+failed)*100';
        // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('yieldMath', CONDITION.NONE, true, 2, yieldMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            yieldMath: [
                { x: 1544400000000, y: 99.11, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 69.27, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 96.85, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 99.67, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH Complicated', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var yieldMath = '(firstPass+rework)/(firstPass+rework+failed)*100';
        // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('yieldMath', CONDITION.NONE, true, undefined, yieldMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            yieldMath: [
                { x: 1544400000000, y: 99.10798122065727, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: 69.27278934790031, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: 96.85471792311532, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: 99.66887526862493, projectId: 'ChrSept' }
            ]
        };
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('PMATH Infinity', function () {
        var dimension = new Dimension('date', TYPE.DATE);
        var yieldMath = '(firstPass+rework)/rework';
        // const divideMath = [new PMath('firstPass', PMATH.DIVIDE), new PMath('failed', PMATH.NONE)];
        var dimensionList = [new Dimension('projectId', TYPE.ANY)];
        var measurementList = [new Measurement('yieldMath', CONDITION.NONE, true, undefined, yieldMath)];
        var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
        var sort = new Sort(SORT.ACS, ['date']);
        var pixie = new Pixie(dataAgg, sort);
        var pixieData = pixie.getPixie();
        var expectedData = {
            yieldMath: [
                { x: 1544400000000, y: 21.11, projectId: 'omakDec10<V03' },
                { x: 1544486400000, y: Infinity, projectId: 'omakDec03<V03' },
                { x: 1544572800000, y: Infinity, projectId: 'omakDec12<V03' },
                { x: 1544572800000, y: Infinity, projectId: 'ChrSept' }
            ]
        };
        console.log(pixieData.yieldMath.pixieAddKey("aa", "aas"));
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
});
