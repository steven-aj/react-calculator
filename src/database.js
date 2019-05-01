import Dexie from 'dexie';

const database = new Dexie("calc_history");

database.version(1).stores({
    history: 'id++, val1, val2, operation, result'
});

export default database;