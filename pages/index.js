import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/initFirebase'
import { onAuthStateChanged } from '@firebase/auth'
import { Layout, Page } from '@shopify/polaris'
import TaxesForm from '../components/TaxesForm'


export default function Home() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        setUser(user);
    } else {
        // User is signed out
        setUser(null);
    }
  });

  return (
    <Page title="Details page">
      <Layout>
        <Layout.Section>
          <TaxesForm />
        </Layout.Section>
      </Layout>
    </Page>
  )
}
