"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index = require('../dist/index.js');
describe('Pixie ProtoType - @Pixie-ProtoType Function Test', function () {
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
    var TYPE = index.TYPE;
    var SORT = index.SORT;
    var CONDITION = index.CONDITION;
    var Dimension = index.Dimension;
    var Measurement = index.Measurement;
    var Aggregate = index.Aggregate;
    var Sort = index.Sort;
    var Pixie = index.Pixie;
    var dimension = new Dimension('timestamp', TYPE.DATE);
    var measurementList = [new Measurement('measured', CONDITION.NONE, true), new Measurement('upperLimit', CONDITION.NONE)];
    var dimensionList = [
        new Dimension('fixtureId', TYPE.NUMBER),
        new Dimension('nominal', TYPE.DOUBLE),
        new Dimension('serialNumber', TYPE.ANY)
    ];
    var dataAgg = new Aggregate(data, dimension, measurementList, dimensionList);
    var sort = new Sort(SORT.ACS, ['timestamp']);
    var pixie = new Pixie(dataAgg, sort);
    var pixieData = pixie.getPixie();
    it('pixieGroup', function () {
        var pixieProtoData = pixieData.measured.pixieGroup('serialNumber');
        var expectedData = [
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
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixieSumGroupBy', function () {
        var pixieProtoData = pixieData.measured.pixieSumGroupBy('serialNumber', 'nominal');
        var expectedData = [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixieSumBy', function () {
        var pixieProtoData = pixieData.measured.pixieSumBy('fixtureId');
        var expectedData = 15400;
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixieSumByEachObject', function () {
        var pixieProtoData = pixieData.measured.pixieSumByEachObject(['fixtureId', 'x']);
        var expectedData = [
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
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixieAddKey', function () {
        var pixieProtoData = pixieData.measured.pixieAddKey('type', 'scatter');
        var expectedData = [
            { type: 'scatter', x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { type: 'scatter', x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { type: 'scatter', x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { type: 'scatter', x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
            { type: 'scatter', x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixieReplaceValue', function () {
        var pixieProtoData = pixieData.measured.pixieReplaceValue('fixtureId', 1530);
        var expectedData = [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1539406636000, y: 0.00005295931, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
            { x: 1543553939000, y: 0.00005297646, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    it('pixiePluckIncrement', function () {
        var pixieProtoData = pixieData.measured.pixiePluckIncrement('y');
        var expectedData = [
            { x: 0, y: 0.00005306795 },
            { x: 1, y: 0.00005302792 },
            { x: 2, y: 0.00005295931 },
            { x: 3, y: 0.00005306223 },
            { x: 4, y: 0.00005297646 }
        ];
        chai_1.expect(pixieProtoData).to.deep.equal(expectedData);
    });
    function logAllProperties(obj) {
        console.log(obj);
        if (obj == null)
            return; // recursive approach
        console.log(Object.getOwnPropertyNames(obj));
        logAllProperties(Object.getPrototypeOf(obj));
    }
});
