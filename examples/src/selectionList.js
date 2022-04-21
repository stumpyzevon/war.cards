const selectionList = (selection) => {
  const selectionNames = selection.selections.map((child) => {
    return child._name;
  });

  if (selectionNames.length === 0) {
    return undefined;
  }

  const parent = document.createElement('div');
  const title = document.createElement('strong');
  title.innerText = 'Selections:';
  parent.appendChild(title);
  const listDiv = document.createElement('div');
  listDiv.innerText = selectionNames.join(', ');
  parent.appendChild(listDiv);
  return parent;
};

export default selectionList;
