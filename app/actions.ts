'use server'

import { Language } from '../utils/translations'
import { auth0 } from '../utils/auth0'
import { redirect } from 'next/navigation'

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { useSession, signIn, signOut } from "next-auth/react"
type FormData = {
  id: string;
  companyName: string;
  companyRegistrationNumber: string;
  yearEstablished: string;
  description: string;
  logo?: string;
  services: string[];
  facebook: string;
  twitter: string;
  instagram: string;
  telephoneNumber: string;
  hasViber: boolean;
  hasWhatsApp: boolean;
  address: string;
  openingHours: {
    [key: string]: { open: string; close: string } | null;
  };
  language: Language;
}

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}));
export async function submitPlumberOnboarding(data: FormData) {
  console.log('Plumber onboarding data:', {
    ...data,
    openingHours: Object.fromEntries(
      Object.entries(data.openingHours).filter(([_, value]) => value !== null)
    ),
  });

  // Simulate a delay to mimic a database operation
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Test0')

  // Authenticate with Auth0
  const session = await auth0.getSession();
  console.log('Test1')
/*
  if (!session) {
    redirect('/api/auth/login');
    //auth0.handleAuth();
  }
console.log('Test2')
  // Save user data to DynamoDB

  const response = await fetch(process.env.BASE_URL+'/app/api/save-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: session.user.sub,
      ...data,
    }),
  });  */
/*
  if (!response.ok) {
    throw new Error('Failed to save user data');
  }

  // Redirect to dashboard
  redirect('/dashboard');*/
  try {
    // await dynamoDb.put({
    //   TableName: process.env.DYNAMODB_TABLE_NAME!,
    //   Item: {
    //     id: data.id,
    //     userId,
    //     ...data,
    //     openingHours: Object.fromEntries(
    //       Object.entries(data.openingHours).filter(([_, value]) => value !== null)
    //     ),
    //   },
    // })
    // const response = await fetch(process.env.BASE_URL+'/app/api/save-user-data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ...data,
    //     userId:data.id
    //   }),
    // }); 
  }catch (error) {}

console.log('session')
  if (session) {
    console.log(session.user.sub)
    try {
     
      // const response = await fetch(process.env.BASE_URL+'/app/api/save-user-data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     pk:session.user.sub,
      //     id:session.user.sub
      //   }),
      // }); 
      // console.log('sendok')
      console.log('put')
      const {logo, ...dataWithoutImage} = data
      data.logo=''
      console.log(`${session.user.sub}||${dataWithoutImage.companyRegistrationNumber}`)
      await dynamoDb.put({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Item: {
          id: session.user.sub,
          pk: `${session.user.sub}||${dataWithoutImage.companyRegistrationNumber}||image`,
          sk: `${session.user.sub}||${dataWithoutImage.companyRegistrationNumber}||image`,
          logo,
        },
      })
        await dynamoDb.put({
          TableName: process.env.DYNAMODB_TABLE_NAME!,
          Item: {
            id: session.user.sub,
            pk: session.user.sub,
            sk: `${session.user.sub}||${dataWithoutImage.companyRegistrationNumber}`,
            ...dataWithoutImage,
            openingHours: Object.fromEntries(
              Object.entries(data.openingHours).filter(([_, value]) => value !== null)
            ),
          },
        })
        console.log('put2')

        console.log('sendok2')

    const result = await dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        pk: session.user.sub,
        sk: session.user.sub,
      },
    });
console.log(result)
    }catch (error) {
      console.log('error')
      console.log(error)

    }
  }
 // redirect('../dashboard');
}

