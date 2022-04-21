import { createRow, createCol } from './utils';
import unitCard from './unitCard';

const createForce = (force) => {
  const forceRow = createRow();
  force.selections.forEach((sel) => {
    const cardCol = createCol(forceRow, ['col-12', 'col-lg-6', 'col-xxl-4']);
    cardCol.appendChild(unitCard(sel));
    forceRow.appendChild(cardCol);
  });
  return forceRow;
};

export default createForce;
