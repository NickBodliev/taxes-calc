import React, { useEffect, useState } from 'react'

import { onSnapshot, doc } from 'firebase/firestore'
import { db, auth } from '../firebase/initFirebase'
import PastRecords from './PastRecords'
import { onAuthStateChanged } from '@firebase/auth';

export default function history () {
    const [user, setUser] = useState(null);
    const [pastMessages, setPastMessages] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                onSnapshot(doc(db, 'messages', user.email), data => { setPastMessages(data) });
            } else {
                // User is signed out
                setUser(null);
            }
        });
      }, [user]);

    return (
        <>
            { user && <PastRecords messages={pastMessages} />}
        </>
    )
}
