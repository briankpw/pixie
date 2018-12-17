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
    var pixieSumAllBy = index.pixieSumAllBy;
    var pixieSumAllByObject = index.pixieSumAllByObject;
    var pixieAddKey = index.pixieAddKey;
    var pixieReplaceValue = index.pixieReplaceValue;
    var pixieRemoveDuplicate = index.pixieRemoveDuplicate;
    var pixiePluckXIncrement = index.pixiePluckXIncrement;
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
    it('pixieSumBy', function () {
        var pixieData = pixieSumGroupBy(rawPixieData.measured, 'serialNumber', 'nominal');
        var expectedData = [
            { x: 'Omak_aa181030125720-1', y: 0.0000694 },
            { x: 'Omak_aa181030125646-1', y: 0.0001388 },
            { x: 'Omak_aa181030125754-1', y: 0.0001388 }
        ];
        console.log(JSON.stringify(pixieData));
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
});
