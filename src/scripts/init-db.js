require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

async function initDb() {
  const sqlPath = path.join(__dirname, '..', 'db', 'initSchema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    await sequelize.authenticate();
    await sequelize.query(sql);
    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Schema initialization failed:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

initDb();
