const productService = require('../services/product.service')

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ errors: error.message })
    }
}


const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productService.deleteProduct(productId)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productService.updateProduct(productId, req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await productService.findProductById(productId)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        console.log(req.params, "///", req.query)
        const products = await productService.getAllProducts(req.query)
        return res.status(200).send(products)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}



const createMultipleProduct = async (req, res) => {
    try {
        data = req.body
        const products = await productService.createMultipleProduct(data)
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({ error: error.message, data: data })
    }
}

module.exports = { createMultipleProduct, findProductById, createProduct, deleteProduct, updateProduct, getAllProducts, }
