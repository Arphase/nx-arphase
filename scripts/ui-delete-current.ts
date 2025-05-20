import { DeleteObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';

async function run() {
  const client = new S3Client({
    region: String(process.env.AWS_REGION),
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  });

  const Bucket = String(process.env.AWS_BUCKET_NAME);

  const listObjectsCommand = new ListObjectsCommand({ Bucket });

  try {
    const data = await client.send(listObjectsCommand);
    (data?.Contents || []).forEach(async item => {
      try {
        const deleteObjectCommand = new DeleteObjectCommand({ Bucket, Key: String(item?.Key) });
        await client.send(deleteObjectCommand);
        console.log(`${item?.Key} deleted`);
      } catch (err) {
        console.log(`${item?.Key} wasn't deleted`);
        throw err;
      }
    });
  } catch (err) {
    console.log('error listing bucket objects ' + err);
    throw err;
  }
}

run();
