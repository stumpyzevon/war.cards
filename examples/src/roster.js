import unitCard from './unitCard';

const createRow = (parent) => {
  const row = document.createElement('div');
  row.classList.add('row');
  parent.appendChild(row);
  return row;
};

const createCol = (row, cls = 'col') => {
  const col = document.createElement('div');
  col.classList.add(cls);
  row.appendChild(col);
  return col;
};

const setRoster = (roster) => {
  const main = document.getElementById('main');
  main.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container-fluid');
  main.appendChild(container);

  const titleCol = createCol(createRow(container));

  let costList = '';
  if (roster.costs) {
    const costs = roster.costs.filter((c) => {
      return c._value !== 0;
    }).map((c) => {
      return `${c._value} ${c._name}`;
    });
    costList = costs.join(' / ');
  }
  const title = document.createElement('h1');
  title.classList.add('float-start');
  title.innerText = roster._name;
  titleCol.appendChild(title);

  const costs = document.createElement('span');
  costs.classList.add('float-end');
  costs.innerText = costList;
  titleCol.appendChild(costs);

  const forceRow = createRow(container);
  roster.forces[0].selections.forEach((sel) => {
    const cardCol = createCol(forceRow, 'col-6');
    cardCol.appendChild(unitCard(sel));
    forceRow.appendChild(cardCol);
  });
};

export default setRoster;
