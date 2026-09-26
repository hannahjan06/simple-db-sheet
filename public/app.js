import data from '../lib/db.js';

function createTable(dataArray) {
  const table = document.getElementById('data-table');
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    table.textContent = 'No data available.';
    return;
  }

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  const columns = Object.keys(dataArray[0]);
  columns.forEach(col => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  dataArray.forEach(item => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      const value = item[col];
      td.textContent = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

document.addEventListener('DOMContentLoaded', () => {
  createTable(data);
});