import PlumberOnboardingForm from '../../components/plumber-onboarding-form'
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
export default async function OnboardingPage() {
  // const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  //   region: process.env.AWS_REGION,
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  //   },
  // }));
  // const session = await getSession();

  // if (session) {
  //   try {
  //     const result = await dynamoDb.get({
  //       TableName: process.env.DYNAMODB_TABLE_NAME!,
  //       Key: {
  //         pk: session.user.sub,
  //         sk: session.user.sub,
  //       },
  //     });
  //     // if(result){
  //     //   console.log('        redirect(/dashboard)')
  //     //   redirect('/dashboard')
  //     // }
  //   }catch (error) {console.log(error)}
  // }


  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Plumber Onboarding</h1>
      <PlumberOnboardingForm />
    </main>
  )
}

