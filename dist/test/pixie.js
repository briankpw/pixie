"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var index = require('../dist/index.js');
describe('Pixie Function - @Pixie Function Test', function () {
    var rawPixieData = {
        measured: [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
            { x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
        ]
    };
    var pixieGroup = index.pixieGroup;
    var pixieSumGroupBy = index.pixieSumGroupBy;
    var pixieSumBy = index.pixieSumBy;
    var pixieSumByEachObject = index.pixieSumByEachObject;
    var pixieAddKey = index.pixieAddKey;
    var pixieReplaceValue = index.pixieReplaceValue;
    var pixiePluckIncrement = index.pixiePluckIncrement;
    it('pixieGroup', function () {
        var pixieData = pixieGroup(rawPixieData.measured, 'serialNumber');
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
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieSumGroupBy-String', function () {
        var pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', 'nominal');
        var expectedData = [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieSumGroupBy-Array', function () {
        var pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', ['nominal', 'fixtureId']);
        var expectedData = [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0001388, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieSumBy', function () {
        var pixieData = pixieSumBy(rawPixieData.measured, 'fixtureId');
        var expectedData = 15400;
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieSumByEachObject', function () {
        var pixieData = pixieSumByEachObject(rawPixieData.measured, ['fixtureId', 'x']);
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
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieAddKey', function () {
        var pixieData = pixieAddKey(rawPixieData.measured, 'type', 'scatter');
        var expectedData = [
            { type: 'scatter', x: 1517288270000, y: 0.00005306795, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { type: 'scatter', x: 1538283573000, y: 0.00005302792, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { type: 'scatter', x: 1539406636000, y: 0.00005295931, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { type: 'scatter', x: 1540961905000, y: 0.00005306223, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
            { type: 'scatter', x: 1543553939000, y: 0.00005297646, fixtureId: 3080, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixieReplaceValue', function () {
        var pixieData = pixieReplaceValue(rawPixieData.measured, 'fixtureId', 1530);
        var expectedData = [
            { x: 1517288270000, y: 0.00005306795, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125720-1' },
            { x: 1538283573000, y: 0.00005302792, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1539406636000, y: 0.00005295931, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125646-1' },
            { x: 1540961905000, y: 0.00005306223, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' },
            { x: 1543553939000, y: 0.00005297646, fixtureId: 1530, nominal: 0.0000694, serialNumber: 'Omak_aa181030125754-1' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('pixiePluckIncrement', function () {
        var pixieData = pixiePluckIncrement(rawPixieData.measured, 'y');
        var expectedData = [
            { x: 0, y: 0.00005306795 },
            { x: 1, y: 0.00005302792 },
            { x: 2, y: 0.00005295931 },
            { x: 3, y: 0.00005306223 },
            { x: 4, y: 0.00005297646 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
});
