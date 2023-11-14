import styles from "./display.module.css";

export default function CompanyItem(props){

    return (
        <div key={props.data?.id} className={styles.companyItem}>
            <div className={styles.companyName}><span className={styles.textOverflow}>{props.data?.name}</span></div>
            <div className={styles.companyDetails}>
            <div className={styles.companyEmployees}><span className={styles.textOverflow}>{props.data?.estimated_num_employees?props.data?.estimated_num_employees:'--NO INFO FOUND--'}</span></div>
            <div className={styles.companyLocation}><span className={styles.textOverflow}>{props.data?.city?props.data?.city:'NO CITY FOUND'}</span></div>
            <div className={styles.companyIndustry}><span className={styles.textOverflow}>{props.data?.industry?props.data?.industry:'--NO INFO FOUND--'}</span></div>
            <div className={styles.companyKeywords}><span className={styles.textOverflow}>{props.data?.keywords.length!=0?props.data?.keywords.join(", "):'--NO INFO FOUND--'}</span></div>
            </div>
        </div>
    )
}