import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/initFirebase'

const WriteToCloudFirestore = async (year, earnings, taxes, guadagnoPuro) => {
        let data = {
            [year]: {earnings: parseInt(earnings), taxes: parseInt(taxes), guadagnoPuro: parseInt(guadagnoPuro)}
        };
        let userEmail = auth.currentUser.email;
        const docSnap = await getDoc(doc(db, "messages", userEmail));
        if(docSnap.exists()){
            alert('record exists');
            await updateDoc(doc(db, "messages", userEmail), data);
        }else{
            await setDoc(doc(db, "messages", userEmail), data);
            alert('record added');
        }
        alert('Data was successfully sent to Firestore');
    }

export default WriteToCloudFirestore;