'use server'

import { useState } from 'react'

import router from 'next/router'
import PageDesigner from '../../../components/PageDesigner'
import { FormData2, useFormStore } from '../../../store/formStore'
import { getSession } from '@auth0/nextjs-auth0';
import { DynamoDBDocument,QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getSession();
  type Nullable<T> = T | null;

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
    

  // const { formData, updateFormData } = useFormStore()
  
  return (
    <PageDesigner formData={res}/>
  )
}

