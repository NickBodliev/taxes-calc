import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/initFirebase'

const WriteToCloudFirestore = async (year, earnings, taxes, guadagnoPuro) => {
        let data = {
            [year]: {earnings: parseInt(earnings), taxes: parseInt(taxes), guadagnoPuro: parseInt(guadagnoPuro)}
        };
        let userEmail = auth.currentUser.email;
        const docSnap = await getDoc(doc(db, "messages", userEmail));
        if(docSnap.exists()){
            // update document, first record
            await updateDoc(doc(db, "messages", userEmail), data);
        }else{
            // create document
            await setDoc(doc(db, "messages", userEmail), data);
        }
    }

export default WriteToCloudFirestore;

export const saveActivityType = async (activityType) => {
    let userEmail = auth.currentUser.email;
    let data = {
        activityType: activityType
    };
    const docSnap = await getDoc(doc(db, "messages", userEmail));
    if(docSnap.exists()){
        // update document
        await updateDoc(doc(db, "messages", userEmail), data);
    }else{
        // create document
        await setDoc(doc(db, "messages", userEmail), data);
    }
}