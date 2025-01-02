import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}));

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/api/auth/login');
  }

  let userData;
  try {
    const result = await dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        userId: session.user.sub,
      },
    });
    userData = result.Item;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>You have successfully authenticated and submitted your plumber onboarding information.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Information:</h2>
      <pre className="bg-gray-100 p-4 mt-4 rounded overflow-auto">
        {JSON.stringify(userData, null, 2)}
      </pre>
    </div>
  );
}

