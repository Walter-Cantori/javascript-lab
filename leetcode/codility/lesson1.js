function solution(N) {

  // convert to binary
  bin = N.toString(2).split('');

  // return 0 if "1" is not found
  if(bin.indexOf('1') === -1) return 0
  
  // get number of "1s" and their position
  let index = 0;
  let indexes = [];
  let counter = 0
  while (index !== -1) {
      index = bin.indexOf('1',counter)
      if (index !== -1) indexes.push(index)
      counter = index + 1;
  }
  
  // return length in case there is only 1 or 2 "1s"
  if (indexes.length < 2) return 0
  if (indexes.length === 2) return indexes[1] - indexes[0] -1
  
  // return max length for other cases
  let max = 0
  for (let i = 0; i < indexes.length -1; i++) {
      if (indexes[i + 1] - indexes[i] - 1 > max) {
          max  = indexes[i + 1] - indexes[i] - 1;
      }
  }
  return max
}

solution(328);