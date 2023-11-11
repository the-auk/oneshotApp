import { useState, useEffect } from "react";
import styles from "./chat.module.css";

export default function ChatMessage(props){
    return (
        <div className={styles.messageWrapper} style={{justifyContent:props.role=='user'?'right':'left'}}>
            <div className={styles.message} style={{backgroundColor:props.role=='user'?'#218aff':'#666666'}}>
                {props.message}
            </div>
        </div>
    )
} 