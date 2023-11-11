const express = require('express');
const router = express.Router();
const {getNewCompaniesList, getUpdatedCompaniesList} = require("../controllers/controllers");

router.post('/newList', getNewCompaniesList);
router.post('/updateList', getUpdatedCompaniesList);

module.exports = router;