const Product = require("../models/Productmodel");
const User = require("../models/Usermodel")
const asynchandler = require("express-async-handler")
const slugify = require('slugify');
const creatProduct = asynchandler(async (req, res) => {
    // res.json({
    //     msg: "its product post route",
    // });
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const new_product = await Product.create(req.body);
        res.json(new_product);
    }
    catch (err) {
        throw new Error(err);
    }
});

const updateProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const update_product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        console.log(update_product)
        res.json(update_product);

    }
    catch (err) {
        throw new Error(err);
    }
});

const deleteProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    try {
        const delete_product = await Product.findByIdAndDelete(id);
        res.json(delete_product);
    }
    catch (err) {
        log.error(err.message);
    }
});

const getaProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    try {
        const find_product = await Product.findById(id);
        res.json(find_product);
    }
    catch (err) {
        throw new Error(err);
    }
});

const getALLproducts = asynchandler(async (req, res) => {
    // console.log(req.query);
    try {
        //here after creating new product in previous module now we are going to add product filtering
        const qryobj = { ...req.query };
        const excludefields = ["page", "sort", "limit", "fields"];
        excludefields.forEach(element => {
            delete qryobj[element];
        });
        let querystring = JSON.stringify(qryobj);
        querystring = querystring.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // console.log(JSON.parse(querystring));
        let product = Product.find(JSON.parse(querystring));//we can use var also 
        //Sorting
        if (req.query.sort) {
            const sortby = req.query.sort.split(',').join(" ")// what does split and join return
            product = product.sort(sortby)
        }
        else {
            product = product.sort('-createdAt');
        }

        //limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(" ")
            product = product.select(fields);
        }
        else {
            product = product.select('-__v')
        }


        //Pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;// logic is quit clear as we are skipping page-1 content when showing present page contnet
        product = product.skip(skip).limit(limit);

        if (req.query.page) {
            const productcount = await Product.countDocuments();
            if (skip >= productcount) throw new Error("This product does't exists")
        }
        console.log(page, limit, skip);
        const finalproductquery = await product;
        res.json(finalproductquery);
        // // console.log(qryobj,req.query);
        // const getall_products = await Product.find(qryobj);
        // res.json(getall_products);
    }
    catch (err) {
        throw new Error(err);
    }
});

const add_to_wishlist = asynchandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    const {prod} = req.body;
    console.log('here is')
    try {
        const userr = await User.findById(_id);
        const already_added = userr.wishlist.find((id) => id.toString() === prodId);
     
        if (already_added) {
            let user = await User.findByIdAndUpdate(_id,
                {
                    $pull: { wishlist: prod },
                },
                {
                    new: true,
                }
            );
            res.json(user); 
        }
        else {
            let user = await User.findByIdAndUpdate(_id,
                {
                    $push: { wishlist: prod },
                },
                {
                    new: true,
                }
            );
            res.json(user);
        }
    }
    catch (err) { throw new Error(err); }
})

module.exports = { creatProduct, getaProduct, getALLproducts, updateProduct, deleteProduct, add_to_wishlist };