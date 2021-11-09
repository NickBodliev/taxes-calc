import { db } from '../../firebase/initFirebase'
import { doc, getDoc } from "firebase/firestore";

export const getActivityType = async (userEmail) => {
    const docSnap = await getDoc(doc(db, "messages", userEmail));
    const docData = await docSnap.data();
    if(docData != undefined){
        const dbActivityType = await docData.activityType;
        return dbActivityType;
    }else{
        return '';
    }
}
