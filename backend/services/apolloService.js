const axios = require('axios');

const apolloBaseUrl = 'https://api.apollo.io/api/v1/mixed_companies/search';
const apolloAPIKEY = '';
const getCompaniesList = async (filters) => {
    const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    };
    // const authRes = await axios.get("https://api.apollo.io/v1/auth/health", { api_key: apolloAPIKEY }, { headers: headers })
    const dataFilters = {
        page : filters.page || 1,
        per_page: 10,
        organization_num_employees_ranges: [`${filters?.employeeRange?.min || 1}, ${filters?.employeeRange?.max || 100000}`],
        organization_locations: filters?.locations || [],
        organization_not_locations: filters?.excludedLocations || [],
        q_organization_keyword_tags: filters?.orgKeywords || [],
    }
    const data = {
        api_key: apolloAPIKEY,
        ...dataFilters
    };
    const response = await axios.post(apolloBaseUrl, data, { headers: headers });
    let companiesList=[]
    if(response.data.accounts.length==0){
        companiesList=response.data.organizations
    }
    else if(response.data.organizations.length==0){
        companiesList=response.data.accounts
    }
    else{
        companiesList=response.data.accounts.concat(response.data.organizations)
    }
    return {
        filters: filters,
        'accounts': companiesList, 
        'pagination': { 'totalPages': response.data.pagination.total_pages, 'currentPage': response.data.pagination.page }
    }
}
exports.getCompaniesList = getCompaniesList