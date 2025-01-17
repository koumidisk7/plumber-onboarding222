import PlumberOnboardingForm from '../../../components/plumber-onboarding-form'
import { redirect } from 'next/navigation';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument,QueryCommand } from '@aws-sdk/lib-dynamodb';
import { useSearchParams } from 'next/navigation'
import { CompanyData } from '../../../components/CompanyCard';
import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';
import {FormData2} from '../../../store/formStore'
//import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(context) {
//     const session = await getSession(context.req, context.res);
//     const id = context.params?.id;
//     return {
//       props: { user: session?.user || null ,id},
//     };
//   },
// });

interface PageProps {
  id: string;
  user: {
    name: string;
    email: string;
    picture?: string;
  };
}
type Nullable<T> = T | null;
export default async function OnboardingPageSpecific({ params }: { params: { id: string } }) {
  console.log(params.id)
  // console.log(user)
  const session = await getSession();
  console.log(session)
  let res : Nullable<FormData2>;
  res=null;

if (params.id!=null&&session!=null){
  const dynamoDb = DynamoDBDocument.from(new DynamoDB({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }));
  
  const result = await dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Key: {
      pk: session.user.sub,
      sk: `${session.user.sub}||${params.id}`,
    },
  });
  const image = await dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Key: {
      pk: `${session.user.sub}||${params.id}||image`,
      sk: `${session.user.sub}||${params.id}||image`,
    },
  });
  res = result.Item as FormData2;
  console.log(image)
  if(image !=null&&image!=undefined&&image.Item!=undefined&&image.Item !=null){
    let temp = res as Record<string, any>;
    if(temp !=null&&temp!=undefined){

    res.logo=temp?.logo;
    }
  }
  console.log('result')
  console.log(`${session.user.sub}||${params.id}||${params.id}||en`)
 console.log(result)
}
  
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
      <PlumberOnboardingForm companyData={res} isEdit={true} />
    </main>
  )
}

