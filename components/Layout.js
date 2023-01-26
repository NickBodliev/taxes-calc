import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Frame, Navigation, Toast, TopBar } from "@shopify/polaris";
import { ChatMajor, HomeMajor, KeyMajor } from "@shopify/polaris-icons";

import { onAuthStateChanged, signOut } from "firebase/auth"
import { UserMenuComponent } from "./UserMenuComponent";
import { db, auth } from '../firebase/initFirebase'
import { getActivityType } from "./cloudFirestore/ActivityType";
import { doc, onSnapshot } from "@firebase/firestore";

React.useLayoutEffect = React.useEffect

export default function Layout({ children }) {
  const [user, setUser] = useState();
  const [activityType, setActivityType] = useState(null);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const router = useRouter();
  const userMenuMarkup = UserMenuComponent(user);
  const skipToContentRef = useRef(null);
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  const [active, setActive] = useState(false);
  const strictRedirect = (path) => { (user && activityType ? redirect(path) : setActive(true)) };
  const redirect = (path) => { router.push(path) };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          setUser(user);
          //dbActivityTypeListener(user.email);
          onSnapshot(doc(db, 'messages', user.email), data => {
            try { setActivityType(data.data().activityType);
            }catch (error) {setActivityType(null)} });
      } else {
          // User is signed out
          setUser(null);
      }
    });
  }, [])

    const getDBActivityType = async (userEmail) => {
      const dbActivityType = await getActivityType(userEmail)
      setActivityType(dbActivityType);
    }

    const dbActivityTypeListener = (userEmail) => {
      onSnapshot(doc(db, 'messages', userEmail), data => { try {
        setActivityType(data.activityType);
      } catch (error) {setActivityType(null)} });
    }

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

  const logo = {
    width: 80,
    topBarSource: './logo.svg',
    contextualSaveBarSource: './logo.svg',
    url: '/',
    accessibilityLabel: 'App Logo'
  };

  return (
    <>
      <Frame
        logo={logo}
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        skipToContentTarget={skipToContentRef.current}
      >
        <main>{children}</main>
        { active && <Toast content={!user ? "Login in order to access Dashboard" : "Select your activity type in order to access Dashboard"} onDismiss={() => setActive(false)} /> }
      </Frame>
    </>
  );
}
