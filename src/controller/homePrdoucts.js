const getProductsByCategories = require('../services/productCategrory.service')
const homeProducts = async (req, res) => {
    try {
        console.log(req.query.search, "asldjflajdsjfa")
        const prdouctsData = await getProductsByCategories(req.query.search)
        res.status(200).send(prdouctsData)
    } catch (error) {
        res.status(500).send({ error: error.message, from: 'homeProducts' })
    }
}

module.exports = homeProducts