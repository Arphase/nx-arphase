import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

function unifyPath(filepath: string) {
  return process.platform === 'win32' ? filepath.replace(/\\/g, '/') : filepath;
}

async function run() {
  const client = new S3Client({
    region: String(process.env.AWS_REGION),
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  });

  const Bucket = String(process.env.AWS_BUCKET_NAME);

  const distFolderPath = path.join(__dirname, String(process.env.DIST_APP_DIR));

  function walk(rootDir: string, callback: any, subdir: string) {
    const isSubdir = subdir ? true : false;
    const absPath = subdir ? path.join(rootDir, subdir) : rootDir;
    fs.readdirSync(absPath).forEach(filename => {
      const filepath = path.join(absPath, filename);
      if (fs.statSync(filepath).isDirectory()) {
        walk(rootDir, callback, unifyPath(path.join(subdir || '', filename || '')));
      } else {
        fs.readFile(filepath, async (error, fileContent) => {
          if (error) {
            throw error;
          }
          const mimeType = String(mime.lookup(filepath));

          const command = new PutObjectCommand({
            Bucket,
            Key: isSubdir ? `${subdir}/${filename}` : filename,
            Body: fileContent,
            ContentType: mimeType,
          });

          try {
            await client.send(command);
            console.log(`Successfully uploaded '${filepath}' with MIME type '${mimeType}'`);
          } catch (err) {
            console.log(`File '${filepath}' wasn't uploaded'`);
            throw err;
          }
        });
      }
    });
  }

  walk(distFolderPath, (filepath: string) => console.log('Filepath', filepath), '');
}

run();
