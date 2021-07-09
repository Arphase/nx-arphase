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

  s3.listObjects({ Bucket }, (err, data) => {
    if (err) {
      console.log('error listing bucket objects ' + err);
      return;
    }
    (data?.Contents || []).forEach(item => {
      s3.deleteObject({ Bucket, Key: String(item?.Key) }, (err, data) => console.log(`${item?.Key} deleted`));
    });
  });

  const distFolderPath = path.join(__dirname, '../../dist/apps/innovatech/app');

  function walk(rootdir: string, callback: any, subdir: string) {
    // is sub-directory
    const isSubdir = subdir ? true : false;
    // absolute path
    const abspath = subdir ? path.join(rootdir, subdir) : rootdir;

    // read all files in the current directory
    fs.readdirSync(abspath).forEach(filename => {
      // full file path
      const filepath = path.join(abspath, filename);
      // check if current path is a directory
      if (fs.statSync(filepath).isDirectory()) {
        walk(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
      } else {
        fs.readFile(filepath, (error, fileContent) => {
          // if unable to read file contents, throw exception
          if (error) {
            throw error;
          }

          // map the current file with the respective MIME type
          const mimeType = String(mime.lookup(filepath));

          // build S3 PUT object request
          const s3Obj = {
            // set appropriate S3 Bucket path
            Bucket: isSubdir ? `${Bucket}/${subdir}` : Bucket,
            Key: filename,
            Body: fileContent,
            ContentType: mimeType,
          };

          // upload file to S3
          s3.putObject(s3Obj, res => {
            console.log(`Successfully uploaded '${filepath}' with MIME type '${mimeType}'`);
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
