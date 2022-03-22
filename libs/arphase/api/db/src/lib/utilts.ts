import * as fs from 'fs';
import * as Path from 'path';
import { Connection } from 'typeorm';

/**
 * Shutdown the http server
 * and close database connections
 */
export async function shutdownServer(server, connection: Connection) {
  await server.httpServer.close();
  await closeDbConnection(connection);
}

/**
 * Closes the database connections
 */
export async function closeDbConnection(connection: Connection) {
  if (connection.isConnected) {
    await (await connection).close();
  }
}

/**
 * Returns the entites of the database
 */
export async function getEntities(connection: Connection) {
  return connection.entityMetadatas.map(x => ({ name: x.name, tableName: x.tableName }));
}

/**
 * Cleans the database and reloads the entries
 */
export async function reloadFixtures(connection: Connection) {
  const entities = await getEntities(connection);
  await deleteAll(entities, connection);
}

/**
 * Drops the database and reloads the entries
 */
export async function dropFixtures(connection: Connection) {
  const entities = await getEntities(connection);
  await dropAll(entities, connection);
}

/**
 * Drops the database and reloads the entries
 */
export async function cleanFixtures(connection: Connection) {
  const entities = await getEntities(connection);
  await cleanAll(entities, connection);
}

/**
 * Deletes all the entities
 */
export async function deleteAll(entities, connection: Connection) {
  try {
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM "${entity?.tableName ? entity.tableName : entity}";`);
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

/**
 * Cleans all the entities
 */
export async function cleanAll(entities, connection: Connection) {
  try {
    const repository = connection.getRepository(entities[0].name);
    await repository.query(`TRUNCATE TABLE ${entities.map(entity => `"${entity.tableName}"`).join(', ')};`);
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

/**
 * Insert the data from the src/test/fixtures folder
 */
export async function loadAll(entities, connection: Connection) {
  try {
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`);
      if (fs.existsSync(fixtureFile)) {
        const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
        await repository.createQueryBuilder(entity.name).insert().values(items).execute();
      }
    }
  } catch (error) {
    throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`);
  }
}

export async function dropAll(entities, connection: Connection) {
  try {
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DROP TABLE "${entity.tableName}" CASCADE;`);
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

export async function dropEntities(entities, connection: Connection): Promise<void> {
  try {
    for (const entityClass of entities) {
      const entity = connection.getMetadata(entityClass);
      await connection.query(`DROP TABLE "${entity.tableName}" CASCADE;`);
    }
  } catch (error) {
    throw new Error(`ERROR: Droping test db: ${error}`);
  }
}
