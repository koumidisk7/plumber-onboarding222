import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { useFormStore } from '../../store/formStore'
import DashBoardClient from '../../components/dashboard-client'
import CompanyCard, { CompanyData } from '../../components/CompanyCard';
//import { motion } from "framer-motion";
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}));

export default async function DashboardPage() {
  const session = await getSession();
  console.log('running')
  // console.log(useFormStore( state => state.formData))

  if (!session) {
    console.log('redirecting')
    redirect('/api/auth/login');
  }
  

  if (session) {
    console.log(session.user.sub)
    try {
      console.log('called before')

      // const response = await fetch(process.env.BASE_URL+'/app/api/save-user-data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...useFormStore( state => state.formData),
      //     userId:session.user.sub
      //   }),
      // }); 
      console.log('called ok')
    }catch (error) {console.log(error)}
  }
  // let userData : CompanyData;
  let companies : CompanyData[];
  // try {
  //   const result = await dynamoDb.get({
  //     TableName: process.env.DYNAMODB_TABLE_NAME!,
  //     Key: {
  //       pk: session.user.sub,
  //       sk: session.user.sub,
  //     },
  //   });
  //   userData = result.Item as CompanyData;

  // } catch (error) {
  //   console.error('Error fetching user data:', error);
  // }

  try {
    // const result = await dynamoDb.get({
    //   TableName: process.env.DYNAMODB_TABLE_NAME!,
    //   Key: {
    //     pk: session.user.sub,
    //   },
    // });
    // console.log('result@@')
    // console.log(result)
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :prefix)",
      ExpressionAttributeValues: {
        ":pk":  session.user.sub ,
        ":prefix": session.user.sub 
      }
    };

    const command = new QueryCommand(params);
    const data = await dynamoDb.send(command);
    console.log('datatest')
    console.log(data)
    companies = data.Items as CompanyData[];
    // return res.status(200).json({ data: data.Items });
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
    // return res.status(500).json({ error: "Failed to query DynamoDB" });
  }
  

  return (
    <div >
      {/* <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1> */}
      <DashBoardClient mockUserData={companies} />
      {/* <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 
     
              className="text-3xl font-bold text-gray-900"
            >
              Your Companies
            </h1>
            <p 
            
              className="mt-1 text-gray-500"
            >
              Manage your company listings and their appearance
            </p>
          </div>
          
          <div

          >
            <Button
              onClick={handleAddCompany}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </div>
        </div>

        <div 
          className="space-y-6"
 
        >
          {mockUserData.companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEditDetails={handleEditDetails}
              onEditDesign={handleEditDesign}
            />
          ))}
        </div>
      </div>
    </div> */}
      {/* <p>You have successfully authenticated and submitted your plumber onboarding information.</p>
      {userData ? (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Your Information:</h2>
          <div className="bg-gray-100 p-4 mt-4 rounded overflow-auto">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Company Name:</strong> {userData.companyName}</p>
            <p><strong>Company Type:</strong> {userData.companyType}</p>
            <p><strong>Year Established:</strong> {userData.yearEstablished}</p>
            <p><strong>Description:</strong> {userData.description}</p>
            <p><strong>Services:</strong> {userData.services.join(', ')}</p>
            <p><strong>Facebook:</strong> {userData.facebook}</p>
            <p><strong>Twitter:</strong> {userData.twitter}</p>
            <p><strong>Instagram:</strong> {userData.instagram}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Opening Hours:</h3>
            {Object.entries(userData.openingHours).map(([day, hours]) => (
              <p key={day}><strong>{day}:</strong> {hours ? `${hours.open} - ${hours.close}` : 'Closed'}</p>
            ))}
          </div>
          {userData.logo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Company Logo:</h3>
              <img src={userData.logo} alt="Company Logo" className="max-w-xs" />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-red-500">Error: Unable to fetch user data. Please try again later.</p>
      )} */}
    </div>
  );
}

