import React, { useEffect, useState } from 'react'

import { onSnapshot, doc } from 'firebase/firestore'
import { db, auth } from '../firebase/initFirebase'
import PastRecords from './PastRecords'
import { onAuthStateChanged } from '@firebase/auth';
import LineChart from './LineChart';

export default function history () {
    const [user, setUser] = useState(null);
    const [pastMessages, setPastMessages] = useState(null);

    const transformToVettoreDiOggetti = (dataType) => {

        // {
        //   {
        //     { year: {earnings, taxes, guadagnoPuro} },   =>  [{year, earnings, taxes, guadagnoPuro},]
        //   }
        // }

        dataType = Object.entries(dataType).map((e) => ( { [e[0]]: e[1] } ));
        let finalReult = [];
        for (const element of dataType) {
          for(const [key, value] of Object.entries(element)){
            if(key != 'activityType')
            finalReult.push([element][key] = Object.assign({year: key}, element[key]));
          }
        }
        return finalReult;
      }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                onSnapshot(doc(db, 'messages', user.email), data => {
                    let processedData = data.data();
                    if(processedData != undefined && processedData != null){
                        delete processedData.activityType;
                        if(processedData != {}){
                            const messages = transformToVettoreDiOggetti(processedData);
                            setPastMessages(messages);
                        }
                    }
                });
            } else {
                // User is signed out
                setUser(null);
            }
        });
      }, [user]);

    return (
        <>
            { user && <>
                        <PastRecords messages={pastMessages} />
                        <LineChart messages={pastMessages} />
                     </>
            }
        </>
    )
}
