import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

async function run() {
  const client = new CloudFrontClient({
    region: String(process.env.AWS_REGION),
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  });

  const params = {
    DistributionId: String(process.env.AWS_DISTRIBUTION_ID),
    InvalidationBatch: {
      CallerReference: String(Date.now()),
      Paths: {
        Quantity: 1,
        Items: ['/*'],
      },
    },
  };

  const command = new CreateInvalidationCommand(params);

  try {
    const response = await client.send(command);
    console.log('Invalidation created:', response.Invalidation);
    return response.Invalidation;
  } catch (error) {
    console.error('Error creating invalidation:', error);
    throw error;
  }
}

run();
