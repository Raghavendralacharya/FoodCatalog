const db = require("../models");
const Food = db.food;
let common =require("../common")
let validation = common.validation;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

const getPagination = (page, size) => {
    //TODO can set env variable
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    let pageObj ={
    "limit": limit,
    "offset": offset
    }
    return pageObj;
};

exports.listFood = async (req, res, next) => {
    //fetch food list 
    try {
        let query = {}

        if(!validation.isEmpty(req.query.name)){
            query.name = req.query.name
        }
        if(!validation.isEmpty(req.query.cost)){
            query.cost = req.query.cost
        }
        if(!validation.isEmpty(req.query.cuisine)){
            query.cuisine = req.query.cuisine
        }

        if(!validation.isEmpty(req.query.food_type)){
            query.food_type = req.query.food_type
        }

        const page = req.query.page;
        const size = req.query.size;

        const options = {}
        if(!validation.isEmpty(size)){
            let pgObj = getPagination(page, size);
            options.offset = pgObj.offset;
            options.limit = pgObj.limit;
        }

        if(req.query.sort){
            options.sort = req.query.sort.split(',').join(' '); //"-name -cost"
        }    

        Food.paginate(query,options)
        .then((data) => {
            res.status(200).send({
            totalItems: data.totalDocs,
            foodItems: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
            });
        })
        .catch((err) => {
            res.status(400).send({
            status: "failure",
            message:
                err.message || "error occurred while retrieving food details.",
            });
        });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message:
                err.message || "error occurred while retrieving food details.",
        });
    }
        
}



exports.addFood = async (req,res,next) => {
    //add food to the food list
    try {
        const newFood = await Food.create(req.body);
        res.status(200).json({
            status: "success",
            data: newFood
        });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message:
                err.message || "error occurred while adding food details.",
        });
    }
}
