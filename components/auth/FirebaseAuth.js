import React, { useState } from 'react'
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { auth } from '../../firebase/initFirebase'
import { useRouter } from 'next/router';
import { Card, ContextualSaveBar, EmptyState, Layout, Page, Select } from '@shopify/polaris';

function FirebaseAuth(props, { globalUser }) {
    const [user, setUser] = useState(globalUser);
    const router = useRouter();

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
        .then((result) => {

          // This gives you a Google Access Token. You can use it to access the Google API.
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          //const user = result.user;
          //setUser(user);
          //console.log(user.email);
          router.push('/');
        }).catch((error) => {
          // Handle Errors here.
          //const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          //const email = error.email;
          // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error);
          // ...

          console.log('Ops... smth went wrong during login process');
          console.log(errorMessage);
        });
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            //setUser(null);
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
    }

    const [activityType, setActivityType] = useState('');

  const handleSelectChange = value => {setActivityType(value); setUnsavedChanges(true);};
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const activityTypes = [
    {label: 'Società di Capitali', value: 'societa-di-capitali'},
    {label: 'Società di Persone', value: 'societa-di-persone'},
    {label: 'Partita IVA Ordinaria', value: 'partita-iva-ordinaria'},
    {label: 'Partita IVA Forfettaria', value: 'partita-iva-forfettaria'}
  ];

    return (
      <Page>
        { unsavedChanges == true &&
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => console.log('add form submit logic'),
              loading: false,
              disabled: false,
            }}
            discardAction={{
              onAction: () => console.log('add clear form logic'),
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