import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase/initFirebase'

const WriteToCloudFirestore = async (year, earnings, taxes, guadagnoPuro) => {
        // let date = new Date();
        // const timerstamp = date.getTime();
        let data = {
            // string_data: 'Francesco',
            // boolean_data: false,
            //map_data: {timerstamp: Timestamp.fromDate(date), number_data: 10},
            //[timerstamp]: {number: taxes}
            [year]: {earnings: earnings, taxes: taxes, guadagnoPuro: guadagnoPuro}
            // array_data: ['text', 4],
            // null_data: null,
            //timer_stamp: Timestamp.fromDate(date),
            //number_data: 6
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