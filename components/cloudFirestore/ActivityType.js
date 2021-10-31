import { db } from '../../firebase/initFirebase'
import { doc, getDoc } from "firebase/firestore";

export const getActivityType = async (userEmail) => {
    const docSnap = await getDoc(doc(db, "messages", userEmail));
    const dbActivityType = await docSnap.data().activityType;
    return dbActivityType;
}
