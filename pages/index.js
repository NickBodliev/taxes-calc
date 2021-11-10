import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase/initFirebase'
import { onAuthStateChanged } from '@firebase/auth'
import { Layout, Page } from '@shopify/polaris'
import TaxesForm from '../components/TaxesForm'
import History from '../components/History'
import { useRouter } from "next/router"
import { getActivityType } from '../components/cloudFirestore/ActivityType'


export default function Home() {
  const [user, setUser] = useState(null);
  const [activityType, setActivityType] = useState(null);
  const router = useRouter();
  const redirect = (path) => { router.push(path) };
  const [activityTypeOutput, setActivityTypeOutput] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
          // User is signed in
          setUser(user);
          await getDBActivityType(user.email);
      } else {
          // User is signed out
          redirect('/auth');
      }
    });
  }, [])

  const getDBActivityType = async (userEmail) => {
    const dbActivityType = await getActivityType(userEmail)
    setActivityType(dbActivityType);
    if(!dbActivityType){
      redirect('/auth');
    }else{
      switch (dbActivityType) {
        case 'societa-di-capitali':
          setActivityTypeOutput('Società di Capitali');
          break;
        case 'societa-di-persone':
          setActivityTypeOutput('Società di Persone');
          break;
        case 'partita-iva-ordinaria':
          setActivityTypeOutput('Partita IVA Ordinaria');
          break;
        case 'partita-iva-forfettaria':
          setActivityTypeOutput('Partita IVA Forfettaria');
          break;
        default:
          setActivityTypeOutput('');
      }
    }
  }


  return (
    <Page title={`Calc taxes for your ${activityTypeOutput} activity`}>
      <Layout>
        <Layout.Section>
          <TaxesForm />
        </Layout.Section>
        <Layout.Section>
          <History />
        </Layout.Section>
      </Layout>
    </Page>
  )
}
