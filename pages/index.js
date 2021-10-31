import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/initFirebase'
import { onAuthStateChanged } from '@firebase/auth'
import { Layout, Page } from '@shopify/polaris'
import TaxesForm from '../components/TaxesForm'
import History from '../components/History'
import { useRouter } from "next/router";


export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const redirect = (path) => { router.push(path) };

  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        setUser(user);
    } else {
        // User is signed out
        //setUser(null);
        redirect('/auth');
        //useRouter().push('/auth');
    }
  });

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
