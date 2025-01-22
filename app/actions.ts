'use server'

import { Language } from '../utils/translations'
import { auth0 } from '../utils/auth0'
import { redirect } from 'next/navigation'
import { Resend } from 'resend';

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { useSession, signIn, signOut } from "next-auth/react"
import { useWebsiteStore, SerializableWebsiteState } from '../store/useWebsiteStore'

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
  console.log('Test0')

  // Authenticate with Auth0
  const session = await auth0.getSession();
  console.log('Test1')

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

        console.log(`${session.user.sub}||${dataWithoutImage.companyRegistrationNumber}`)

    const result = await dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        pk: session.user.sub,
        sk: session.user.sub,
      },
    });

    const resulteMAIL = await dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: {
        pk: `${session.user.sub}||EMAIL_SENT`,
        sk: `${session.user.sub}||EMAIL_SENT`,
      },
    });
    console.log(resulteMAIL)
if(resulteMAIL.Item){
//skip sending email
}
else{

  const resend = new Resend(process.env.RESEND_API_KEY!);
  
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'koumidisk7@gmail.com',
    subject: 'Hello World!!---',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });
  
  await dynamoDb.put({
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Item: {
      pk: `${session.user.sub}||EMAIL_SENT`,
      sk: `${session.user.sub}||EMAIL_SENT`,
    },
  })
}

console.log(result)
    }catch (error) {
      console.log('error')
      console.log(error)

    }
  }
 // redirect('../dashboard');
}


export async function submitDesignData(data: FormData,useWebsiteStore:SerializableWebsiteState,companyId:string) {
  console.log('Plumber onboarding data:', {
    ...data,
    openingHours: Object.fromEntries(
      Object.entries(data.openingHours).filter(([_, value]) => value !== null)
    ),
  });
  console.log('formData.companyRegistrationNumber2222');

  console.log(data.companyRegistrationNumber);


  // Authenticate with Auth0
  try {
  const session = await auth0.getSession();

      const {logo, ...dataWithoutImage} = data
      data.logo=''
     

      await dynamoDb.put({
          TableName: process.env.DYNAMODB_TABLE_NAME!,
          Item: {
            pk: `${session?.user.sub}||design`,
            sk: `${session?.user.sub}||design||${dataWithoutImage.companyRegistrationNumber}`,
            ...useWebsiteStore,
          },
        })
        console.log( ` actions ==> ${session?.user.sub}||design||${dataWithoutImage.companyRegistrationNumber}`)
        console.log( ` actions2 ==> ${session?.user.sub}||design||${companyId}`)

        return { success: true, message: 'Data saved successfully' }
      } catch (error) {
        console.error('Error saving data to DynamoDB:', error)
        return { success: false, message: 'Error saving data' }
      }
 // redirect('../dashboard');
}