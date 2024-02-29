const express = require('express');
const router = express.Router()
const homeProducts = require('../controller/homePrdoucts')


router.get('/', homeProducts)

module.exports = router