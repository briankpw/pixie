import * as _ from 'underscore';

function pixieGroup(pixieData: any, groupByProperty: string) {
  return _.chain(pixieData)
    .groupBy(groupByProperty)
    .map(function(value, key) {
      const mapObject:any = {};
      mapObject[groupByProperty] = key;
      mapObject['data'] = value;

      return mapObject;
    })
    .value();
}

function pixieSumBy(pixieData: any, groupByProperty: string) {
  return _.chain(pixieData)
    .groupBy(groupByProperty)
    .map(function(value, key) {
      const total = _.reduce(
        value,
        function(acc, val) {
          return acc + val.y;
        },
        0
      );
      return { x: value[0][groupByProperty], y: total };
    })
    .value();
}

// function pixieSumAllBy(pixieData: any, groupByProperty: string) {
//   let total = 0;
//   _.each(pixieData[groupByProperty], d => {
//     total += d['y'];
//   });
//   return total;
// }

// function pixieSumAllByObject(pixieData: any, sumByProperty: Array<string>) {
//   _.each(pixieData, function(d, i) {
//     let total = 0;
//     _.each(sumByProperty, function(key: string) {
//       total += d[key];
//     });
//     pixieData[i]['total'] = total;
//   });
//   return pixieData;
// }

// function pixieAddKey(pixieData: any, key, value) {
//   return _.map(pixieData, function(d) {
//     const mapObject = {};
//     mapObject[key] = value;
//     return _.extend(mapObject, d);
//   });
// }

// function pixieReplaceValue(pixieData: any, key, value) {
//   return _.map(pixieData, function(d) {
//     const mapObject = {};
//     mapObject[key] = value;
//     return _.extend(d, mapObject);
//   });
// }

// function pixieRemoveDuplicate(pixieData: any, key?) {
//   if (_.isArray(pixieData)) {
//     let keyValue;
//     let temp = -0.01;
//     let xTemp;
//     const arr = [];

//     if (typeof key !== 'undefined') {
//       keyValue = key;
//     } else {
//       keyValue = 'y';
//     }

//     _.each(pixieData, (d, i) => {
//       if (d[keyValue] > temp || d[keyValue] < temp) {
//         if (i !== 0) {
//           const next: any = {};
//           next['x'] = xTemp;
//           next[keyValue] = d[keyValue];
//           arr.push(next);
//         }

//         xTemp = d.x;
//         temp = d[keyValue];
//         arr.push(d);
//       }
//     });

//     if (arr[arr.length - 1].x !== pixieData[pixieData.length - 1].x) {
//       arr.push(pixieData[pixieData.length - 1]);
//     }
//     return arr;
//   } else {
//     return [];
//   }
// }

// function pixiePluckXIncrement(pixieData: any, key, renameX?) {
//   const pluck = _.pluck(pixieData, key);

//   return _.map(pluck, function(d, i) {
//     const pluckPixie = {};

//     if (typeof renameX !== 'undefined') {
//       pluckPixie[renameX] = i;
//       pluckPixie[key] = d;
//     } else {
//       pluckPixie['x'] = i;
//       pluckPixie[key] = d;
//     }
//     return pluckPixie;
//   });
// }
