const Categories = require('../Models/category.model');
const Products = require('../Models/product.model');

async function getProductsByCategories(searchText) {
    const lavelThreeCat = await Categories.find({ lavel: 3 }).populate('parentCategory');
    console.log(searchText, "aljdfaldsflajdlajldjflajdslaj")

    const result = {};
    let lavelOneCat = await Categories.find({ lavel: 1 });

    for (const category of lavelThreeCat) {
        if (category.parentCategory.parentCategory.toString() === lavelOneCat[0]._id.toString()) {
            let query = { category: category._id };

            if (searchText.trim()) {
                query["$or"] = [
                    { title: { $regex: searchText, $options: "i" } },
                    { description: { $regex: searchText, $options: "i" } }
                ];
            }

            const productsForCategory = await Products.find(query).limit(10);


            // Initialize result[lavelOneCat[0].name] as an object if it doesn't exist
            if (!result[lavelOneCat[0].name]) {
                result[lavelOneCat[0].name] = {};
            }

            // Initialize result[lavelOneCat[0].name][category.parentCategory.name] as an object if it doesn't exist
            if (!result[lavelOneCat[0].name][category.parentCategory.name]) {
                result[lavelOneCat[0].name][category.parentCategory.name] = {};
            }

            result[lavelOneCat[0].name][category.parentCategory.name][category.name] = productsForCategory;
        } else if (category.parentCategory.parentCategory.toString() === lavelOneCat[1]._id.toString()) {
            let query = { category: category._id };

            if (searchText) {
                query["$or"] = [
                    { title: { $regex: searchText, $options: "i" } },
                    { description: { $regex: searchText, $options: "i" } }
                ];
            }

            const productsForCategory = await Products.find(query).limit(10);


            // Initialize result[lavelOneCat[1].name] as an object if it doesn't exist
            if (!result[lavelOneCat[1].name]) {
                result[lavelOneCat[1].name] = {};
            }

            // Initialize result[lavelOneCat[1].name][category.parentCategory.name] as an object if it doesn't exist
            if (!result[lavelOneCat[1].name][category.parentCategory.name]) {
                result[lavelOneCat[1].name][category.parentCategory.name] = {};
            }

            result[lavelOneCat[1].name][category.parentCategory.name][category.name] = productsForCategory;
        }
    }

    return result;
};

module.exports = getProductsByCategories;

