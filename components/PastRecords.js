import { Card, DataTable } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'

function Messages({messages}) {
    const [records, setRecords] = useState([])

    useEffect(() => {
        if(messages != null && messages != undefined){
            let messagesRecords = messages.data();
            let rows = [];
            for(const prop in messagesRecords){
                rows.push(
                    [prop, messagesRecords[prop].earnings, messagesRecords[prop].taxes, messagesRecords[prop].guadagnoPuro]
                );
            }
            setRecords(rows);
        }
    }, [messages])

    if(records.length === 0){
        return <p>no messages</p>
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


// function DataTableExample() {
  
//     return (
//         <Card>
//           <DataTable
//             columnContentTypes={[
//               'text',
//               'numeric',
//               'numeric',
//               'numeric',
//               'numeric',
//             ]}
//             headings={[
//               'Product',
//               'Price',
//               'SKU Number',
//               'Net quantity',
//               'Net sales',
//             ]}
//             rows={rows}
//             totals={['', '', '', 255, '$155,830.00']}
//           />
//         </Card>
//     );
//   }