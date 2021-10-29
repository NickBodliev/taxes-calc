import React, { useEffect, useState } from 'react'
import { Message } from './Message';

function Messages({messages}) {
    const [records, setRecords] = useState([])

    useEffect(() => {
        if(messages != null && messages != undefined){
            let messagesRecords = messages.data();
            let messagesComponent = [];
            for(const prop in messagesRecords){
                messagesComponent.push(
                    <Message
                        year={prop}
                        earnings={messagesRecords[prop].earnings}
                        taxes={messagesRecords[prop].taxes}
                        guadagnoPuro={messagesRecords[prop].guadagnoPuro}
                    />);
            }
            setRecords(messagesComponent);
        }
    }, [messages])

    if(records.length === 0){
        return <p>no messages</p>
    }else{
        return(
            <ul>
                {records}
            </ul>
        )
    }
}

export default Messages
