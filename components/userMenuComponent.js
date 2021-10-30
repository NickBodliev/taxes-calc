import React, { useCallback, useState } from 'react'

import { TopBar } from "@shopify/polaris";
import { LogOutMinor, KeyMajor } from "@shopify/polaris-icons";

import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import { auth } from '../firebase/initFirebase'
import { useRouter } from "next/router";

export function userMenuComponent(user) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const router = useRouter();
    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
      );
    const redirect = (path) => { router.push(path) };

    const logout = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
          setUser(null);
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
        redirect('/auth');
    }

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

    if(user){
    return (
        <TopBar.UserMenu
        actions={[
            {
              items: [{content: 'Log Out', icon: LogOutMinor, onAction: logout}],
            },
            {
              items: [
                      {content: 'About This App', url: 'http://simp.ly/p/fF4mxM'},
                      {content: 'About Developer', url: 'https://mykola-bodliev.herokuapp.com/'}
                    ]
            },
          ]}
          name={user.displayName}
          avatar={user.photoURL}
          open={isUserMenuOpen}
          onToggle={toggleIsUserMenuOpen}
        />
    )}else{
        return (
            <TopBar.UserMenu
              actions={[
                {
                  items: [{content: 'Log In', icon: KeyMajor, onAction: login}],
                },
                {
                  items: [{content: 'About The Developer'}],
                },
              ]}
              open={isUserMenuOpen}
              onToggle={toggleIsUserMenuOpen}
            />
        )
    }
}
