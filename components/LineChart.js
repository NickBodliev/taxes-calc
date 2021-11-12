import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({messages}) {
    const [data, setData] = useState('')

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
            const data = {
                labels: years,
                datasets: [ earnings, taxes, guadagnoPuro ]
            }
            setData(data);
        }
    }, [messages])

    return (
        <Line data={data} />
    )
}

export default LineChart
