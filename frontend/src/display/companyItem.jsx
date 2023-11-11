import styles from "./display.module.css";

export default function CompanyItem(props){
    return (
        <div key={props.data?.id} className={styles.companyItem}>
            <div className={styles.companyName}><span className={styles.textOverflow}>{props.data?.name}</span></div>
        </div>
    )
}