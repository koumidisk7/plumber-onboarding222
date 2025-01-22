'use server'

import { useState } from 'react'

import router from 'next/router'
import PageDesigner from '../../../components/PageDesigner'
import { FormData2, useFormStore } from '../../../store/formStore'
import { getSession } from '@auth0/nextjs-auth0';
import { DynamoDBDocument,QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import {  INITIAL_WEBSITE_STATE, SerializableWebsiteState } from '../../../store/useWebsiteStore'
import LeftSidebar from './left-sidebar'

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getSession();
  type Nullable<T> = T | null;

  let res : Nullable<FormData2>;
  let resDesign : Nullable<SerializableWebsiteState>;
  res=null;
  resDesign=null;
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
    console.log(result)
    console.log(`${session.user.sub}||${params.id}`)
    res = result.Item as FormData2;
    if(image !=null&&image!=undefined&&image.Item!=undefined&&image.Item !=null){
      let temp = res as Record<string, any>;
      if(temp !=null&&temp!=undefined){
  
      res.logo=temp?.logo;
      }
    }

   
   const resultDesign = await dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Key: {
      pk: `${session?.user.sub}||design`,
      sk: `${session?.user.sub}||design||${params.id}`,
    },
  });
if(resultDesign.Item!= undefined){
  resDesign = resultDesign.Item as SerializableWebsiteState;

}
else
{resDesign=INITIAL_WEBSITE_STATE;}
console.log(resultDesign )
console.log(`page ==> ${session?.user.sub}||design||${params.id}`)
console.log(`page ==> ${res?.companyRegistrationNumber}`)
console.log(res)

  }
    

  // const { formData, updateFormData } = useFormStore()
  
  return (
    
    <div className="flex min-h-screen">
      <LeftSidebar />

      <main className="flex-grow overflow-x-hidden">
       <PageDesigner companyData={res} resDesign={resDesign}  /> 

      </main>
    </div>
  )
}

