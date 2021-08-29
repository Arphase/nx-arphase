import { config, S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

function unixifyPath(filepath: string) {
  return process.platform === 'win32' ? filepath.replace(/\\/g, '/') : filepath;
}

async function run() {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new S3();
  const Bucket = String(process.env.AWS_BUCKET_NAME);

  const distFolderPath = path.join(__dirname, process.env.DIST_APP_DIR);

  function walk(rootdir: string, callback: any, subdir: string) {
    const isSubdir = subdir ? true : false;
    const abspath = subdir ? path.join(rootdir, subdir) : rootdir;

    fs.readdirSync(abspath).forEach(filename => {
      const filepath = path.join(abspath, filename);
      if (fs.statSync(filepath).isDirectory()) {
        walk(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
      } else {
        fs.readFile(filepath, (error, fileContent) => {
          if (error) {
            throw error;
          }
          const mimeType = String(mime.lookup(filepath));

          const s3Obj = {
            Bucket: isSubdir ? `${Bucket}/${subdir}` : Bucket,
            Key: filename,
            Body: fileContent,
            ContentType: mimeType,
          };

          s3.putObject(s3Obj, (err, data) => {
            err
              ? console.log(`File '${filepath}' wasn't uploaded'`)
              : console.log(`Successfully uploaded '${filepath}' with MIME type '${mimeType}'`);
          });
        });
      }
    });
  }

  walk(
    distFolderPath,
    (filepath: string, rootdir: string, subdir: string, filename: string) => {
      console.log('Filepath', filepath);
    },
    ''
  );
}

run();
