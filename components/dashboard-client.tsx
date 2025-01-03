'use client'

import { useState, useEffect } from 'react'
import { useFormStore } from '../store/formStore'
import { getSession } from '@auth0/nextjs-auth0';

 
export default async function DashBoardClient() {

  const session = await getSession();

  useEffect(() => {
console.log(useFormStore( state => state.formData))
      const response =  fetch(process.env.BASE_URL+'/app/api/save-user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...useFormStore( state => state.formData),
          userId:session.user.sub
        }),
      }); 
  })


  return (
    <>
      
    </>
  )
}

