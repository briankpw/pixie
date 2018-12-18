import * as _ from 'underscore';

declare var require: any;
require('./pixie-prototype');

function pixieGroup(pixieData: any, groupByKey: string): any {
  return _.chain(pixieData)
    .groupBy(groupByKey)
    .map(function(value, key) {
      const mapObject: any = {};
      mapObject[groupByKey] = key;
      mapObject['data'] = value;

      return mapObject;
    })
    .value();
}

// Group By Key and Sum By Y By Default
function pixieSumGroupBy(pixieData: any, groupByKey: string, sumKey: string): any {
  return _.chain(pixieData)
    .groupBy(groupByKey)
    .map(function(value) {
      const payload = { ...value[0] };
      const total = _.reduce(
        value,
        function(acc, val) {
          return acc + val[sumKey];
        },
        0
      );
      payload[sumKey] = total;
      return payload;
    })
    .value();
}

function pixieSumBy(pixieData: any, sumKey: string): number {
  let total = 0;
  _.each(pixieData, (d: any) => {
    total += d[sumKey];
  });
  return total;
}

function pixieSumByEachObject(pixieData: any, sumByKey: Array<string>): any {
  const data: Array<any> = [];
  _.each(pixieData, function(d: any, i) {
    let total = 0;
    _.each(sumByKey, function(key: string) {
      total += d[key];
    });
    const obj = { ...d };
    obj['total'] = total;
    data.push(obj);
  });
  return data;
}

function pixieAddKey(pixieData: any, key: any, value: any): any {
  return _.map(pixieData, function(d: any) {
    const mapObject: any = {};
    mapObject[key] = value;
    return _.extend(mapObject, d);
  });
}

function pixieReplaceValue(pixieData: any, key: any, value: any): any {
  return _.map(pixieData, function(d: any) {
    const mapObject: any = {};
    mapObject[key] = value;
    return _.extend(d, mapObject);
  });
}

function pixiePluckIncrement(pixieData: any, key: any, rename: any = 'x'): any {
  const pluck = _.pluck(pixieData, key);

  return _.map(pluck, function(d, i) {
    const pluckPixie: any = {};
    pluckPixie[rename] = i;
    pluckPixie[key] = d;
    return pluckPixie;
  });
}

export {
  pixieGroup,
  pixieSumGroupBy,
  pixieSumBy,
  pixieSumByEachObject,
  pixieAddKey,
  pixieReplaceValue,
  pixiePluckIncrement
};
