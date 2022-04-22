const profileTable = (profileName, profiles) => {
  const columnNames = new Set([profileName]);
  profiles.forEach((profile) => {
    profile.characteristics.forEach((c) => {
      columnNames.add(c._name);
    });
  });

  const table = document.createElement('table');
  table.classList.add('table');

  const header = document.createElement('thead');
  table.appendChild(header);
  const headerRow = document.createElement('tr');
  header.appendChild(headerRow);

  Array.from(columnNames).forEach((colName) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = colName;
    headerRow.appendChild(headerCell);
  });

  profiles.forEach((profile) => {
    const row = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.textContent = profile._name;
    row.appendChild(headerCell);
    profile.characteristics.forEach((c) => {
      const cell = document.createElement('td');
      cell.textContent = c.__text;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
};

export default profileTable;
