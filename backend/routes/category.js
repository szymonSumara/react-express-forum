const express = require('express');
const router = new express.Router();

const { Category } = require('../models/category');


router.get( '' , async (request, response) => {
    const categories = await Category.find({});
    response.status(200).send(categories);
})



module.exports = router;



