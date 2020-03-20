const express = require('express');
const router = express.Router();
const customer = require('../models/Customers');
const listingsandreviews = require('../models/listingsandreviews');

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



router.get('/customer/rentals', async(req, res)=> {
    const colle = listingsandreviews.collection.collectionName;
    console.log(colle);
    console.log(listingsandreviews);
    const look = await customer.aggregate([{
        $lookup: {
            from: colle,
            localField: '_id',
            foreignField: 'idCustomer',
            as: 'Rentals'
        }
    }]);
    res.json(look);
});

router.post('/lolo', async(req,res)=>{
        const newListing = new listingsandreviews ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        property_type: req.body.property_type,
        idCustomer: req.body.idCustomer

    });
    await newListing.save();

    res.json({
        status: "Listing saved"
    });
});

router.get('/lolo', async(req,res)=>{
    const constListings = await listingsandreviews.find({});
    res.json(constListings);
});

router.get('/rentadosYes', async(req,res)=>{
    const rentadas = await listingsandreviews.find({$where:'this.idCustomer>0'});
    res.json(rentadas);
});

router.get('/tiposPropiedad', async(req,res)=>{
    const propiedades = await listingsandreviews.find({$or:[{"property_type":"home"},{"property_type":"Department"},{"property_type":"Hotel"}]});
    res.json(propiedades);
});

router.get('/precios', async(req,res)=>{
    const precios = await listingsandreviews.find({$and:[{"price":{$gte:20}},{"price":{$lte:21}}]});
    res.json(precios);
});








module.exports = router;