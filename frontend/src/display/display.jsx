import { useState, useEffect } from 'react';
import styles from "./display.module.css";
import CompanyItem from './companyItem';
import { getUpdatedCompaniesList } from "../service/apiClient"

export default function Display(props) {
    const [filters, setFilters] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [pagination, setPagination] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
        if (props) {
            setFilters(props.companyData?.filters)
            setCompanyData(props.companyData?.accounts)
        }
        setPagination(props.companyData?.pagination)
        setCurrentPage(props.companyData?.pagination?.currentPage)
    }, [props])

    const handlePageChangeSubmit = async (e) => {
        e.preventDefault()
        console.log("DISPLAY", filters)
        const result = await getUpdatedCompaniesList(filters)
        if (result.status == 200) {
            setFilters(result.data?.filters)
            setCompanyData(result.data?.accounts)
        }
        setPagination(result.data?.pagination)
        setCurrentPage(result.data?.pagination.currentPage)
    }
    const handleOnPageChange = (e) => {
        setCurrentPage(e.target.value)
        setFilters((prev) => {
            return { ...prev, 'page': e.target.value }
        })
    }
    return (
        <div className={styles.listWrapper}>
            {companyData && (<>{companyData?.map((company) => {
                return <CompanyItem data={company} />
            })}
                <div className={styles.paginationFooter}>
                    Page {pagination.currentPage} / {pagination.totalPages}
                    <form onSubmit={handlePageChangeSubmit}><input onChange={handleOnPageChange} value={currentPage}></input></form>
                </div>
            </>)}
        </div>
    )
}