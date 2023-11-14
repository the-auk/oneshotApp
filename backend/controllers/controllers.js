const chatService = require("../services/chatService")
const apolloService = require("../services/apolloService")

const getNewCompaniesList = async (req, res) => {
    console.log("LOGGING CHAT REQUEST")
    const { userMessage } = req.body;
    const filters = await chatService.getFilters(userMessage);
    if(filters!=null){
        const companiesList = await apolloService.getCompaniesList(filters);
        res.send(companiesList)
    }
    else{
        res.status(666).send("There's been an error, please try again.")
    }
}
const getUpdatedCompaniesList = async (req, res) => {
    console.log("LOGGING APOLLO REQUEST")
    const {filters} = req.body;
    const companiesList = await apolloService.getCompaniesList(filters);
    res.send(companiesList)
}

module.exports = {getNewCompaniesList, getUpdatedCompaniesList}