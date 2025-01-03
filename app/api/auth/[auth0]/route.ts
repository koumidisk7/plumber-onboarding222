import { handleAuth } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';

 // const session = await getSession();


  export const GET =   handleAuth();
//  export const GET =   session&&session.user.sub?  redirect('./dashboard'):handleAuth();

