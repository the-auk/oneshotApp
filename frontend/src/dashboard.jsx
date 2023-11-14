import { useEffect, useState } from "react";
import Chat from "./chat/chat";
import styles from "./dashboard.module.css";
import Display from "./display/display";
import { getNewCompaniesList, getUpdatedCompaniesList } from "./service/apiClient";

export default function Dashboard(){
    const [companiesData, setCompaniesData] = useState({})
    const [loadingState, setLoadingState] = useState(null);

    const handleCompanyData = (companyData) => {
        setLoadingState(false)
        setCompaniesData(companyData)
    }

    const handleLoadingState = () => {
        setLoadingState(true)
    }
    return (
        <div className={styles.dashboard}>
            <Chat passCompanyDataUp={handleCompanyData} passLoadingStateUp={handleLoadingState} />
            {companiesData && <Display loadingState={loadingState} companyData={companiesData} />}
        </div>
    )
}