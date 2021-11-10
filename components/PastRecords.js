import { Button, Card, IndexTable, TextStyle, Toast, Stack } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import { DeleteMinor } from '@shopify/polaris-icons';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../firebase/initFirebase'


function Messages({messages}) {
    const [records, setRecords] = useState([]);
    const [active, setActive] = useState(false);

    const resourceName = {
      singular: 'Record',
      plural: 'Records',
    };

    const removeRecord = async (year) => {
      const docRef = doc(db, 'messages', auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data();
      delete data[year];
      await setDoc(docRef, data);
      setActive(true);
    }

    const deleteAllRecords = async() => {
      const docRef = doc(db, 'messages', auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      const activityType = docSnap.data().activityType;
      await deleteDoc(docRef);
      await setDoc(docRef, {activityType: activityType});
    }

    useEffect(() => {
        if(messages != null && messages != undefined){
          const rows = messages.map(
            ({year, earnings, taxes, guadagnoPuro}, index) => (
                <IndexTable.Row id={year} key={year} position={index}>
                <IndexTable.Cell>
                  <TextStyle variation="strong">{year}</TextStyle>
                </IndexTable.Cell>
                <IndexTable.Cell>{earnings}</IndexTable.Cell>
                <IndexTable.Cell>{taxes}</IndexTable.Cell>
                <IndexTable.Cell>{guadagnoPuro}</IndexTable.Cell>
                <Button onClick={() => removeRecord(year)} icon={DeleteMinor}/>
              </IndexTable.Row>
            ),
          );
            setRecords(rows);
        }
    }, [messages])

    if(records.length === 0){
        return (
          <Card title="Start with adding your first record!" sectioned />
        )
    }else{
        return(
          <>
            <Card title="Past Records" sectioned>
              <IndexTable
                resourceName={resourceName}
                itemCount={messages.length}
                headings={[
                  {title: 'Year'},
                  {title: 'Earnings'},
                  {title: 'Taxes'},
                  {title: 'Guadagno Puro', hidden: false},
                ]}
                selectable={false}
              >
                {records}
              </IndexTable>
              <Stack>
  <Stack.Item fill></Stack.Item>
  <Stack.Item>
    <Button destructive onClick={deleteAllRecords}>Delete all records</Button>
  </Stack.Item>
  </Stack>
            </Card>
            { active && <Toast content="Record deleted successfully" onDismiss={() => setActive(false)} /> }
            </>
      )
    }
}

export default Messages