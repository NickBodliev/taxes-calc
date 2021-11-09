import { Button, Card, IndexTable, TextStyle } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import {
  DeleteMinor
} from '@shopify/polaris-icons';

function Messages({messages}) {
    const [records, setRecords] = useState([]);
    const resourceName = {
      singular: 'Record',
      plural: 'Records',
    };

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
                <Button onClick={() => alert(year)} icon={DeleteMinor}/>
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
            </Card>
      )
    }
}

export default Messages