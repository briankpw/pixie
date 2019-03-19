// Performance is 3x Faster of release/v1 - StandardNaturalSort
function NaturalSort(a: any, b: any, property: any) {
  const ax: any = [],
    bx: any = [];

  if (a[property] == null) {
    a[property] = '';
  }
  if (b[property] == null) {
    b[property] = '';
  }

  a[property].replace(/(\d+)|(\D+)/g, function(_: any, $1: any, $2: any) {
    ax.push([$1 || Infinity, $2 || '']);
  });
  b[property].replace(/(\d+)|(\D+)/g, function(_: any, $1: any, $2: any) {
    bx.push([$1 || Infinity, $2 || '']);
  });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) {
      return nn;
    }
  }

  return ax.length - bx.length;
}


export { NaturalSort };
