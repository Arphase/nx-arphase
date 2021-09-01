import { config, S3 } from 'aws-sdk';

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
      s3.deleteObject({ Bucket, Key: String(item?.Key) }, (err, data) =>
        err ? console.log(`${item?.Key} wasn't deleted`) : console.log(`${item?.Key} deleted`)
      );
    });
  });
}

run();
