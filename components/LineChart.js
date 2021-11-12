import { Badge, Heading, Stack } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({messages}) {
    const [data, setData] = useState(null)

    useEffect(() => {
        if(messages != null && messages != undefined){
            let earnings = {
                'label': 'Earnings',
                'data': []
            }
            let taxes = {
                'label': 'Taxes',
                'data': []
            }
            let guadagnoPuro = {
                'label': 'Guadagno Puro',
                'data': []
            }
            let years = [];
            messages.forEach(message => {
                years.push(message.year);
                earnings.data.push(message.earnings);
                taxes.data.push(message.taxes);
                guadagnoPuro.data.push(message.guadagnoPuro);
            });
            setColor(earnings, 'rgba(255, 206, 86, 0.5)');
            setColor(taxes, 'rgba(54, 162, 235, 0.3)');
            setColor(guadagnoPuro, 'rgba(255, 0, 255, 0.3)');
            earnings.fill =  true;
            taxes.fill =  true;
            guadagnoPuro.fill =  true;
            earnings.tension = 0.5;
            taxes.tension = 0.5;
            guadagnoPuro.tension = 0.5;
            const data = {
                labels: years,
                datasets: [ earnings, taxes, guadagnoPuro ]
            }
            setData(data);
        }
    }, [messages]);

    const setColor = (dataObj, color) => {
        dataObj.borderColor = [color];
        dataObj.backgroundColor = [color];
        dataObj.pointBackgroundColor = color;
        dataObj.pointBorderColor = color;
    }

    if(messages && messages.length > 1){
        return (
            <>
            { data && <Line data={data} /> }
            </>
        )
    }else{
        return (
            <Stack spacing="loose" alignment="center" distribution="center">
                <Badge>In order to see the chart you need to have at least 2 records</Badge>
            </Stack>
        )
    }
}

export default LineChart
