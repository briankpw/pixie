"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const index = require('../dist/index.js');
describe('Sorting - @getPixieSort Function Test', () => {
    const data = [
        { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6.0, firstPass: 194.0, rework: 0.0 },
        { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0.0, firstPass: 208.0, rework: 0.0 },
        { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0.0, firstPass: 208.0, rework: 0.0 },
        { projectId: 'ChrSept', date: '2018-12-12', failed: 10.0, firstPass: 3010.0, rework: 0.0 }
    ];
    const data2 = [
        { testName: 'Main___ReturnRealArray#1>10', measured: '1.12345678' },
        { testName: 'Main___ReturnRealArray#1>1', measured: '2.23456789' },
        { testName: 'Main___ReturnRealArray#1>3', measured: '0' },
        { testName: 'Main___ReturnRealArray#1>2', measured: '1.12345678' },
        { testName: 'Main___ReturnRealArray#1>5', measured: '2.23456789' },
        { testName: 'Main___ReturnRealArray#1>4', measured: '0' },
        { testName: 'Main___ReturnRealArray#1>41', measured: '1.12345678' },
        { testName: 'Main___ReturnRealArray#1>51', measured: '2.23456789' },
        { testName: 'Main___ReturnRealArray#1>5', measured: '0' }
    ];
    const TYPE = index.TYPE;
    const SORT = index.SORT;
    const CONDITION = index.CONDITION;
    const Dimension = index.Dimension;
    const Measurement = index.Measurement;
    const Aggregate = index.Aggregate;
    const Sort = index.Sort;
    const Pixie = index.Pixie;
    it('Sort By Date [NONE]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        const dataAgg = new Aggregate(data, dimension, measurementList);
        const sort = new Sort(SORT.NONE, ['date']);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        chai_1.expect(pixieData).to.deep.equal(data);
    });
    it('Sort By Date [ACS]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        const dataAgg = new Aggregate(data, dimension, measurementList);
        const sort = new Sort(SORT.ACS, ['date']);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date [DESC]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        const dataAgg = new Aggregate(data, dimension, measurementList);
        const sort = new Sort(SORT.DESC, 'date');
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date & Project [ACS]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        const dataAgg = new Aggregate(data, dimension, measurementList);
        const sort = new Sort(SORT.ACS, ['date', 'projectId']);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Sort By Date & Project [DESC]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('firstPass', CONDITION.NONE)];
        const dataAgg = new Aggregate(data, dimension, measurementList);
        const sort = new Sort(SORT.DESC, ['date', 'projectId']);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { projectId: 'omakDec10<V03', date: '2018-12-12', failed: 6, firstPass: 194, rework: 0 },
            { projectId: 'ChrSept', date: '2018-12-12', failed: 10, firstPass: 3010, rework: 0 },
            { projectId: 'omakDec03<V03', date: '2018-12-11', failed: 0, firstPass: 208, rework: 0 },
            { projectId: 'omakDec10<V03', date: '2018-12-10', failed: 0, firstPass: 208, rework: 0 }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Natural Sort By Test Name [ACS]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('measured', CONDITION.NONE)];
        const dataAgg = new Aggregate(data2, dimension, measurementList);
        const sort = new Sort(SORT.ACS, ['testName'], true);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { testName: 'Main___ReturnRealArray#1>1', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>2', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>3', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>4', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>10', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>41', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>51', measured: '2.23456789' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Natural Sort By Test Name & Measured [ACS]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('measured', CONDITION.NONE)];
        const dataAgg = new Aggregate(data2, dimension, measurementList);
        const sort = new Sort(SORT.ACS, ['testName', 'measured'], true);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { testName: 'Main___ReturnRealArray#1>1', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>2', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>3', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>4', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>10', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>41', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>51', measured: '2.23456789' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Natural Sort By Test Name [DESC]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('measured', CONDITION.NONE)];
        const dataAgg = new Aggregate(data2, dimension, measurementList);
        const sort = new Sort(SORT.DESC, ['testName'], true);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { testName: 'Main___ReturnRealArray#1>51', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>41', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>10', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>4', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>3', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>2', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>1', measured: '2.23456789' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
    it('Natural Sort By Test Name & Measured [DESC]', () => {
        const dimension = new Dimension('date', TYPE.DATE);
        const measurementList = [new Measurement('measured', CONDITION.NONE)];
        const dataAgg = new Aggregate(data2, dimension, measurementList);
        const sort = new Sort(SORT.DESC, ['testName', 'measured'], true);
        const pixie = new Pixie(dataAgg, sort);
        const pixieData = pixie.getPixieSort();
        const expectedData = [
            { testName: 'Main___ReturnRealArray#1>51', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>41', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>10', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '2.23456789' },
            { testName: 'Main___ReturnRealArray#1>5', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>4', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>3', measured: '0' },
            { testName: 'Main___ReturnRealArray#1>2', measured: '1.12345678' },
            { testName: 'Main___ReturnRealArray#1>1', measured: '2.23456789' }
        ];
        chai_1.expect(pixieData).to.deep.equal(expectedData);
    });
});
