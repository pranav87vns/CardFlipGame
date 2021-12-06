export const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export const shuffleCards = () => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currIndex = i - 1;
    swap(array, currIndex, randomIndex);
  }

  return array;
};

export const getIdArray = array => {
  array.map((o, i) => Object.assign(o, {id: i + 1}));
  return array;
};

const sortByKey = (array, key) => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

var out = new Array(12).fill(1).map(function (val, index) {
  return {
    name: Math.floor(Math.random() * 100 + 1),
    id: index,
  };
});
