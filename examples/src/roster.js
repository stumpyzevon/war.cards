import createForce from './force';
import { createRow, createCol } from './utils';

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
  roster.forces.forEach((force) => {
    const forceNameCol = createCol(createRow(container));
    const forceNameTitle = document.createElement('h2');
    forceNameTitle.innerText = force._name;
    forceNameCol.appendChild(forceNameTitle);
    container.appendChild(forceNameCol);

    const forceElement = createForce(force, roster);
    container.appendChild(forceElement);
  });
};

export {
  createRow,
  createCol,
  setRoster,
};
