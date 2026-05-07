// node db/init.js  (desde frontefolio_api/)
// Uso alternativo: aplica schema.sql directamente (sin tracking de migraciones).
// Para producción usa: node db/migrate.js && node db/seed.js
const fs   = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function init() {
  const connection = await mysql.createConnection({
    host:               process.env.DB_HOST     || 'localhost',
    port:               process.env.DB_PORT     || 3306,
    user:               process.env.DB_USER     || 'root',
    password:           process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

  console.log('Inicializando base de datos...');
  await connection.query(sql);
  console.log('Base de datos inicializada correctamente.');
  await connection.end();
}

init().catch(err => {
  console.error('Error inicializando la base de datos:', err.message);
  process.exit(1);
});
