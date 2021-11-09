import { Card, DataTable } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'

function Messages({messages}) {
    const [records, setRecords] = useState([])

    useEffect(() => {
        if(messages != null && messages != undefined){
          let rows = messages.map(
            ({year, earnings, taxes, guadagnoPuro}) =>
              [year, earnings, taxes, guadagnoPuro]
            );
            console.log(rows);
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