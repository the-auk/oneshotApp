import { useState } from "react";
import Chat from "./chat/chat";
import styles from "./dashboard.module.css";
import Display from "./display/display";
import { getNewCompaniesList, getUpdatedCompaniesList } from "./service/apiClient";

export default function Dashboard(){
    const [companiesData, setCompaniesData] = useState({})

    const handleCompanyData = (companyData) => {
        setCompaniesData(companyData)
    }
    return (
        <div className={styles.dashboard}>
            <Chat passCompanyDataUp={handleCompanyData} onClick={getNewCompaniesList} />
            {companiesData && <Display companyData={companiesData} />}
        </div>
    )
}