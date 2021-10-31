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

  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        setUser(user);
        getDBActivityType(user.email);
        // setActivityType(getActivityType(user.email));
        // if(!activityType){
        //   redirect('/auth');
        // }
    } else {
        // User is signed out
        redirect('/auth');
    }
  });

  const getDBActivityType = async (userEmail) => {
    const dbActivityType = await getActivityType(userEmail)
    setActivityType(dbActivityType);
  }

  return (
    <Page title="Details page">
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
