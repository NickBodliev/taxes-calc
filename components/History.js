import React, { useEffect, useState } from 'react'

import { onSnapshot, doc } from 'firebase/firestore'
import { db, auth } from '../firebase/initFirebase'
import Messages from '../components/Messages'
import { onAuthStateChanged } from '@firebase/auth';

export default function history () {
    const [user, setUser] = useState(null);
    const [pastMessages, setPastMessages] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            setUser(user);
        } else {
            // User is signed out
            setUser(null);
        }
    });

    useEffect(() => {
        // running on user change
        if(user){
          const userEmail = user.email;
          onSnapshot(doc(db, 'messages', userEmail), data => { setPastMessages(data) });
        }
      }, [user]);

    return (
        <div>
            { user && <Messages messages={pastMessages} />}
        </div>
    )
}
