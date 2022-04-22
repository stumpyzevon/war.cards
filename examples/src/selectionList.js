const selectionList = (selection) => {
  const selectionNames = selection.selections.map((child) => {
    if (child._number === 1) {
      return child._name;
    }
    return `${child._name} x ${child._number}`;
  });

  if (selectionNames.length === 0) {
    return undefined;
  }

  const parent = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = 'Selections:';
  parent.appendChild(title);
  const listDiv = document.createElement('div');
  listDiv.textContent = selectionNames.join(', ');
  parent.appendChild(listDiv);
  return parent;
};

export default selectionList;
