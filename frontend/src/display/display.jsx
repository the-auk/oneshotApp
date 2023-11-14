import { useState, useEffect } from 'react';
import styles from "./display.module.css";
import CompanyItem from './companyItem';
import { getUpdatedCompaniesList } from "../service/apiClient"

export default function Display(props) {
    const [filters, setFilters] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("PROPS", props)
        if (props.companyData) {
            setFilters(props.companyData?.filters)
            setCompanyData(props.companyData?.accounts)
            setPagination(props.companyData?.pagination)
            setCurrentPage(props.companyData?.pagination?.currentPage)
            setLoading(props.loadingState)
        }
    }, [props])

    const handlePageChangeSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await getUpdatedCompaniesList(filters)
        if (result.status == 200) {
            setFilters(result.data?.filters)
            setCompanyData(result.data?.accounts)
        }
        setPagination(result.data?.pagination)
        setCurrentPage(result.data?.pagination.currentPage)
        setLoading(false)
    }
    const handleOnPageChange = (e) => {
        setCurrentPage(e.target.value)
        setFilters((prev) => {
            return { ...prev, 'page': e.target.value }
        })
    }
    return (
        <div className={styles.listWrapper}>
            {loading?(<div className={styles.loadingState}>Loading</div>):
            companyData ? (<>
            <div className={styles.header}>
                <span className={styles.headerItem} style={{paddingLeft:'0px', width:'200px'}}>Company</span>
                <span className={styles.headerItem} style={{width:'150px'}}># Employees</span>
                <span className={styles.headerItem} style={{width:'170px'}} >Location</span>
                <span className={styles.headerItem} style={{width:'200px'}} >Industry</span>
                <span className={styles.headerItem} style={{width:'auto'}} >Keywords</span>
            </div>
            {companyData?.map((company) => {
                if(company!=null){
                return <CompanyItem data={company} />}
            })}
                <div className={styles.paginationFooter}>
                    <form onSubmit={handlePageChangeSubmit}>
                        Page <input style={{
                            width:currentPage<100?'15px':currentPage<1000?'30px':currentPage<10000?'40px':'50px'
                        }} className={styles.currentPage} onChange={handleOnPageChange} value={currentPage}>
                            </input> / {pagination.totalPages}</form>
                </div>
            </>):(
                <div className={styles.emptyState}>
                    Ahh...:( So Empty <br />
                    Search Something
                </div>
            )}
        </div>
    )
}