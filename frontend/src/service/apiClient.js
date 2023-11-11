import axios from "axios";

const apiBasePath = 'https://ec2-18-117-96-59.us-east-2.compute.amazonaws.com/'

export const getNewCompaniesList = async (userMessage) => {
    try {
        const list = await axios.post(`${apiBasePath}/newList`, {
            userMessage: userMessage
        })
        return list
    } catch (err) {
        throw err;
    }
}

export const getUpdatedCompaniesList = async (filters) => {
    try {
        const list = await axios.post(`${apiBasePath}/updateList`, {
            filters:filters
        })
        return list
    } catch (err) {
        throw err;
    }
}

