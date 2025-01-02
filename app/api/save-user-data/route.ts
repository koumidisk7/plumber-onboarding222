import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}));

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    
    await dynamoDb.put({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Item: {
        userId: userData.userId,
        ...userData,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to save user data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

