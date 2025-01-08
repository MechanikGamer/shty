import dotenv from 'dotenv';
import dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

dotenv.config();

const { DYNAMODB_LOCAL_ENDPOINT, NODE_ENV, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_REGION, AWS_ACCESS_KEY_ID, or AWS_SECRET_ACCESS_KEY is missing in .env');
}

const isLocal = NODE_ENV !== 'production';

// Configure Dynamoose
if (isLocal) {
  if (!DYNAMODB_LOCAL_ENDPOINT) {
    throw new Error('DYNAMODB_LOCAL_ENDPOINT is missing in .env for local development');
  }
  dynamoose.aws.ddb.local(DYNAMODB_LOCAL_ENDPOINT);
  console.log(`Configured Dynamoose to use local endpoint: ${DYNAMODB_LOCAL_ENDPOINT}`);
} else {
  // Use AWS SDK v3 DynamoDB
  const dynamoDB = new DynamoDB({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  // Set DynamoDB instance for Dynamoose
  dynamoose.aws.ddb.set(dynamoDB);
  console.log(`Configured Dynamoose to use AWS DynamoDB in region: ${AWS_REGION}`);
}

// Function to confirm table initialization
export const connectToDB = async () => {
  console.log('Initializing DynamoDB tables...');
  try {
    console.log('Tables will be created automatically by dynamoose on first interaction.');
  } catch (error) {
    console.error('Error initializing DynamoDB tables:', error);
    throw error;
  }
};
