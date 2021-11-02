import { db } from '../../firebase/initFirebase'
import { doc, getDoc } from "firebase/firestore";

export const getActivityType = async (userEmail) => {
    const docSnap = await getDoc(doc(db, "messages", userEmail));
    const docData = await docSnap.data();
    console.log(docData);
    if(docData != undefined){
        console.log(docSnap.data());
        const dbActivityType = await docData.activityType;
        return dbActivityType;
    }else{
        return '';
    }
}
