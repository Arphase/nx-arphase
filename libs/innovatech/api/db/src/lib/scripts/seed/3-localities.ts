import fs from 'fs';
import path from 'path';
import { getManager } from 'typeorm';

export async function insertLocalities(): Promise<void> {
  const entityManager = getManager();

  const filePath = path.join(__dirname, 'sepomex-catalog.sql');

  console.log('Inserting localities...');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    await entityManager.query(data);
    console.log('Inserting localities done!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}
