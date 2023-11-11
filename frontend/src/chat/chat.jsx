import { getNewCompaniesList } from "../service/apiClient"
import { useState, useEffect } from "react";
import ChatMessage from "./chatMessage";
import styles from "./chat.module.css";
import { PaperPlaneRight } from '@phosphor-icons/react'

export default function Chat(props) {
    const [messageList, setMessageList] = useState([])
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false);

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }
    const handleDataFetch = async (e) => {
        e.preventDefault();
        if (!loading) {
            setMessageList((prev) => {
                return [...prev, { 'role': 'user', 'text': userInput }]
            })
            const tempInput = userInput;
            setUserInput('')
            setLoading(true)
            const result = await getNewCompaniesList(tempInput)
            if(result.status==200){
                setMessageList((prev) => {
                    return [...prev, { 'role': 'system', 'text': `Here's what I found for ${tempInput}` }]
                })
                props.passCompanyDataUp(result.data)
            }
            else{
                setMessageList((prev) => {
                    return [...prev, { 'role': 'system', 'text': `${result.data}` }]
                })
            }
            setLoading(false)
        }
    }

    return (
        <div className={styles.chatBox}>
            <div className={styles.messageList}>
                {messageList.length > 0 && messageList.map((message, index) => {
                    return (<ChatMessage key={index} message={message.text} role={message.role} />)
                })}
            </div>
            <form action='' className={styles.inputWrapper}>
                <input className={styles.inputBox} onChange={handleUserInput} value={userInput} />
                <button className={styles.submitButton} onClick={handleDataFetch}>
                    <PaperPlaneRight size={20} />
                    </button>
            </form>
        </div>
    )
}