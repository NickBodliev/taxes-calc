import React, { useEffect, useState } from 'react'
import { Message } from './Message';

function Messages({messages}) {
    const [names, setMessages] = useState([])

    useEffect(() => {
        if(messages != null && messages != undefined){
            let messagesRecords = messages.data();
            let messagesComponent = [];
            for(const prop in messagesRecords){
                messagesComponent.push(<Message name={messagesRecords[prop].number} />);
            }
            setMessages(messagesComponent);
        }
    }, [messages])

    if(names.length === 0){
        return <p>no messages</p>
    }else{
        return(
            <ul>
                {names}
            </ul>
        )
    }
}

export default Messages
