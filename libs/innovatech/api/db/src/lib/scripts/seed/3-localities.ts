import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

export async function insertLocalities(connection: DataSource, { light } = { light: false }): Promise<void> {
  const entityManager = connection;

  const filePath = path.join(__dirname, light ? 'sepomex-catalog-light.sql' : 'sepomex-catalog.sql');

  console.log('Inserting localities...');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    await entityManager.query(data);
    console.log('Inserting localities done!');
  } catch (error) {
    console.log(error);
  }
  return;
}
