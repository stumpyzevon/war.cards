const createRow = (parent = undefined) => {
  const row = document.createElement('div');
  row.classList.add('row');
  if (parent) {
    parent.appendChild(row);
  }
  return row;
};

const createCol = (row, cls = ['col']) => {
  const col = document.createElement('div');
  col.classList.add(...cls);
  row.appendChild(col);
  return col;
};

export {
  createRow,
  createCol,
};
