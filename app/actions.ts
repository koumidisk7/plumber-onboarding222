'use server'

import { Language } from '../utils/translations'
import { auth0 } from '../utils/auth0'
import { redirect } from 'next/navigation'

type FormData = {
  companyName: string
  companyType: string
  yearEstablished: string
  description: string
  logo?: string
  services: string[]
  facebook: string
  twitter: string
  instagram: string
  openingHours: {
    [key: string]: { open: string; close: string } | null;
  };
  language: Language;
}

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
  redirect('../unauthorized');
}

