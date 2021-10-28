import React, { useState } from 'react'
import { signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { auth } from '../../firebase/initFirebase'
import { useRouter } from 'next/router';
import { Card, EmptyState, Layout, Page } from '@shopify/polaris';

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

    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <EmptyState
                heading="Manage your taxes in a smart way"
                action={(user ? {content: 'Log out', onAction: logout, destructive: true} : {content: 'Log in', onAction: login})}
                secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Track and manage your taxes with this app</p>
              </EmptyState>
          </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
}

export default FirebaseAuth;