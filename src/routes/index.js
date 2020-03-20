const express = require('express');
const router = express.Router();
const customer = require('../models/Customers');

router.get('/', (req, res) =>{
    res.render('index');
});


router.get('/', async (req, res) =>{
    const datos = await customer.find({});
    res.json(datos);
});

router.post('/', async (req, res) =>{
    const newCustomer = new customer({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        district: req.body.district,
        status: req.body.status
    });
    await newCustomer.save();

    res.json({
        status: "Customer añadido"
    })
});

router.put('/:id', async (req, res) =>{
    const {id} = req.params;
    const updateCus = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        district: req.body.district,
        status: req.body.status
    }
    await customer.findByIdAndUpdate(id, {$set : updateCus}, {new : true});
    res.json({
        status : "Customer actualizado"
    })
});

router.delete('/:id', async (req, res) =>{
    await customer.findByIdAndRemove(req.params.id);
    res.json({
        status : "Customer eliminado"
    }) 
});

module.exports = router;