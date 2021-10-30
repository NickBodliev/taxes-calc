import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Frame, Navigation, TopBar } from "@shopify/polaris";
import { ChatMajor, HomeMajor, KeyMajor } from "@shopify/polaris-icons";

import { onAuthStateChanged, signOut } from "firebase/auth"
import { userMenuComponent } from "./userMenuComponent";
import { auth } from '../firebase/initFirebase'

export default function Layout({ children }) {
  const [user, setUser] = useState();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const router = useRouter();
  const userMenuMarkup = userMenuComponent(user);
  const skipToContentRef = useRef(null);
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  const strictRedirect = (path) => { (user ? router.push(path) : alert('Login to start Useing this fanastic app')) };
  const redirect = (path) => { router.push(path) };

  onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          setUser(user);
      } else {
          // User is signed out
          setUser(null);
      }
    });

  const topBarMarkup = (
        <TopBar
          showNavigationToggle
          userMenu={userMenuMarkup}
          onNavigationToggle={toggleMobileNavigationActive}
        />
      );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        fill
        title=""
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: () => strictRedirect("/"),
          },
          {
            label: "My Account",
            icon: KeyMajor,
            onClick: () => redirect("/auth"),
          },
        ]}
      />
      <Navigation.Section
        separator
        items={[
          {
            label: "Contact Developer",
            icon: ChatMajor,
            onClick: () => redirect("mailto:info.mykola.it@gmail.com"),
          },
        ]}
      />
    </Navigation>
  );

  return (
    <>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef.current}
      >
        <main>{children}</main>
      </Frame>
    </>
  );
}
