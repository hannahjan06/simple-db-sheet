const seedData = require('../db/seed.json');

// Deep‑clone the seed so the original stays untouched
let originalData = JSON.parse(JSON.stringify(seedData));
let data = JSON.parse(JSON.stringify(seedData));

function _ensureTable(table) {
  if (!data.hasOwnProperty(table)) {
    throw new Error(`Unknown table: ${table}`);
  }
  return data[table];
}

function getAll(table) {
  const tbl = _ensureTable(table);
  // Return a shallow copy to prevent external mutation
  return tbl.slice();
}

function getById(table, id) {
  const tbl = _ensureTable(table);
  const record = tbl.find(r => r.id === id);
  return record || null;
}

function _generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function insert(table, record) {
  const tbl = _ensureTable(table);
  const newRecord = { ...record, id: _generateId() };
  tbl.push(newRecord);
  return newRecord;
}

function update(table, id, patch) {
  const tbl = _ensureTable(table);
  const index = tbl.findIndex(r => r.id === id);
  if (index === -1) return null;
  const updated = { ...tbl[index], ...patch, id: tbl[index].id };
  tbl[index] = updated;
  return updated;
}

function remove(table, id) {
  const tbl = _ensureTable(table);
  const index = tbl.findIndex(r => r.id === id);
  if (index === -1) return false;
  tbl.splice(index, 1);
  return true;
}

function reset() {
  data = JSON.parse(JSON.stringify(originalData));
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
  reset
};