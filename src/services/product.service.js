const Product = require('../Models/product.model')
const Category = require('../Models/category.model')

async function createProduct(reqData) {
    let topLavel = await Category.findOne({ name: reqData.topLavelCategory })
    if (!topLavel) {
        topLavel = new Category({
            name: reqData.topLavelCategory,
            lavel: 1
        })
    }
    let secondLavel = await Category.findOne({
        name: reqData.secondLavelCategory,
        parentCategory: topLavel._id,
    })

    if (!secondLavel) {
        secondLavel = new Category({
            name: reqData.secondLavelCategory,
            parentCategory: topLavel._id,
            lavel: 2
        })
    }
    let thirdLavel = await Category.findOne({
        name: reqData.thirdLavelCategory,
        parentCategory: secondLavel._id,
    })
    if (!thirdLavel) {
        thirdLavel = new Category({
            name: reqData.thirdLavelCategory,
            parentCategory: secondLavel._id,
            lavel: 3
        })
    }
    await topLavel.save()
    await secondLavel.save()
    await thirdLavel.save()
    function convertToNumber(value) {
        const numericValue = Number(value);
        return isNaN(numericValue) ? null : numericValue;
    }
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: convertToNumber(reqData.discountedPrice),
        discountPersent: convertToNumber(reqData.discountPersent),
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: convertToNumber(reqData.price),
        sizes: reqData.size,
        quantity: convertToNumber(reqData.quantity),
        category: thirdLavel._id
    });
    return await product.save()
}

async function deleteProduct(productId) {
    const product = await findProductById(productId)
    await Product.findByIdAndDelete(product._id)
    return "deleted Product"
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData)
}

async function findProductById(id) {
    const product = await Product.findById(id).populate('category').exec();
    if (!product) {
        throw new Error('Product not found!')
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNo, pageSize } = reqQuery;
    pageSize = pageSize || 10
    let query = Product.find().populate('category')
    minPrice = parseInt(minPrice)
    maxPrice = parseInt(maxPrice)
    console.log(minPrice + 1, typeof (minPrice))
    console.log(maxPrice + 1, typeof (maxPrice))
    if (category) {
        let existCategory = []
        try {
            existCategory = await Category.find({ name: category.lavelThree })
            console.log(existCategory, "----")
        } catch (error) {
            console.log("error--", error)
            console.log("+_+_", category, typeof (category))
        }
        if (existCategory.length > 0) {
            query = query.where('category').equals(existCategory[0]._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }
    if (color) {
        console.log(color, '111');

        // Convert color array to lowercase and trim whitespace
        const colorValues = color.map(c => c.trim().toLowerCase());

        // Use $regex operator to match documents where color field matches any of the colorValues
        const colorRegex = new RegExp(colorValues.join('|'), 'i');
        query = query.where('color').regex(colorRegex);

    }

    if (sizes) {
        const sizesSet = new Set(sizes)
        query = query.where("sizes.name").in([...sizesSet])
    }
    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gt(minPrice).lt(maxPrice)
    }
    if (minDiscount) {
        query = query.where('discountedPrice').gte(minDiscount);
    }
    if (stock) {
        if (stock == 'in_stock') {
            query = query.where('quantity').gt(0)
        }
        else if (stock == 'out_of_stock') {
            query = query.where('quantity').equals(0)
        }
    }
    if (sort) {
        const sortDirection = sort === 'price_height' ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection })
    }
    const totalProducts = await Product.countDocuments(query)
    const skip = pageNo ? (pageNo - 1) * pageSize : 0
    let _query = query.skip(skip).limit(pageSize);
    const products = await _query.exec();
    console.log(products, 'nmnmnmnmnm')
    const totalPages = Math.ceil(totalProducts / pageSize);
    return { content: products, currentPage: pageNo, totalPages }
}



async function createMultipleProduct(products) {
    for (const product of products) {
        console.log(product + "----")
        await createProduct(product)
    }
}

module.exports = { createProduct, deleteProduct, updateProduct, getAllProducts, findProductById, createMultipleProduct }