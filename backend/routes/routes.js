const express = require('express');
const router = express.Router();
const {getNewCompaniesList, getUpdatedCompaniesList} = require("../controllers/controllers");


router.get('/', (req, res)=>{
    res.write('RUNNING SERVER')
});
router.post('/api/newList', getNewCompaniesList);
router.post('/api/updateList', getUpdatedCompaniesList);

module.exports = router;