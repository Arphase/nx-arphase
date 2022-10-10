import { promises } from 'fs';
import { Readable } from 'stream';

export function getReadableStream(buffer: Buffer): Readable {
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  return stream;
}

export async function tobase64(imgPath: string): Promise<string> {
  return await promises.readFile(imgPath, { encoding: 'base64' });
}
