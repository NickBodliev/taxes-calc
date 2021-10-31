import React, { useState } from 'react'
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { auth } from '../../firebase/initFirebase'
import { useRouter } from 'next/router';
import { Card, ContextualSaveBar, EmptyState, Layout, Page, Select } from '@shopify/polaris';
import { saveActivityType } from '../cloudFirestore/Write'

function FirebaseAuth(props, { globalUser }) {
    const [user, setUser] = useState(globalUser);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [activityType, setActivityType] = useState('');

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        setUser(user);
    } else {
        // User is signed out
        setUser(null);
    }
    });

    const login = () => {
        signInWithPopup(auth, new GoogleAuthProvider)
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Ops... smth went wrong during login process. Check console log for more details');
          console.log(errorCode);
          console.log(errorMessage);
        });
    }

  const handleSelectChange = value => {setActivityType(value); setUnsavedChanges(true);};

  const activityTypes = [
    {label: 'Società di Capitali', value: 'societa-di-capitali'},
    {label: 'Società di Persone', value: 'societa-di-persone'},
    {label: 'Partita IVA Ordinaria', value: 'partita-iva-ordinaria'},
    {label: 'Partita IVA Forfettaria', value: 'partita-iva-forfettaria'}
  ];

  const updateActivityType = (activityType) => {
    saveActivityType(activityType);
    setUnsavedChanges(false);
  }

    return (
      <Page>
        { unsavedChanges == true &&
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => updateActivityType(activityType),
              loading: false,
              disabled: false,
            }}
            discardAction={{
              onAction: () => {setActivityType(''); setUnsavedChanges(false)},
            }}
          />
        }
        <Layout>
          {user ?
            <Layout.Section>
              <Card
                title="Select your activity type in order to start using Tax Tracker"
                sectioned
              >
                <Select
                  label="Activity Type"
                  options={activityTypes}
                  onChange={handleSelectChange}
                  value={activityType}
                  placeholder=" ~ Activity Type ~ "
                  //error={ }
                />
              </Card>
            </Layout.Section>
          :
          <Layout.Section>
            <Card sectioned>
              <EmptyState
                heading="Manage your taxes in a smart way"
                action={{content: 'Log in', onAction: login}}
                secondaryAction={{content: 'Learn more', url: 'http://simp.ly/p/fF4mxM'}}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Track and manage your taxes with this app</p>
              </EmptyState>
          </Card>
          </Layout.Section>
          }
        </Layout>
      </Page>
    )
}

export default FirebaseAuth;