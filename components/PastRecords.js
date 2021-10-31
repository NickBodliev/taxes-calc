import { Card, DataTable } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'

function Messages({messages}) {
    const [records, setRecords] = useState([])

    useEffect(() => {
        if(messages != null && messages != undefined){
            let messagesRecords = messages.data();
            let rows = [];
            for(const prop in messagesRecords){
              if(prop != 'activityType')
                rows.push(
                    [prop, messagesRecords[prop].earnings, messagesRecords[prop].taxes, messagesRecords[prop].guadagnoPuro]
                );
            }
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
          <DataTable
            columnContentTypes={[
              'text',
              'number',
              'number',
              'number',
            ]}
            headings={[
              'Year',
              'Earnings',
              'Taxes',
              'Net Earnings',
            ]}
            rows={records}
          />
        </Card>
        )
    }
}

export default Messages
