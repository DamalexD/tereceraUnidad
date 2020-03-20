const express = require('express');
const router = express.Router();
const customer = require('../models/Customers');
const listingsandreviews = require('../models/listingsandreviews');


//all
router.get('/', async (req, res) =>{
    const customers = await customer.find();
    res.render('index', {customers});
});

//insert
router.post('/add', async (req, res) =>{
    const customers = new customer(req.body);
    await customers.save();
    res.redirect('/');
});

//edit
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const customers = await customer.findById(id);
    res.render('edit', {customers});
});

//updateBy ID
router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    await customer.updateOne({'_id' : id}, req.body);
    res.redirect('/');
});

//deleteBy ID
router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
    await customer.remove({'_id' : id});
    res.redirect('/'); 
});

//edit status
router.post('/edit/activo/:id', async(req, res) => {
    const {id} = req.params;
    await customer.updateOne({'_id' : id}, req.body);
    res.redirect('/');
})
router.get('/edit/status/:id', async (req, res) => {
    const {id} = req.params;
    const customers = await customer.findById(id);
    res.render('status', {customers});
});


//parte postman

router.get('/rentas', async(req, res)=> {
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


//6.- Propiedades rentadas por los clientes
router.post('/insertar', async(req,res)=>{
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

router.get('/busqueda', async(req,res)=>{
    const constListings = await listingsandreviews.find({});
    res.json(constListings);
});


//7.- Propiedades rentadas
router.get('/rentadosYes', async(req,res)=>{
    const rentadas = await listingsandreviews.find({$where:'this.idCustomer>0'});
    res.json(rentadas);
});

//Reporte tipo de propiedad
router.get('/tiposPropiedad', async(req,res)=>{
    const propiedades = await listingsandreviews.find({$or:[{"property_type":"home"},{"property_type":"Department"},{"property_type":"Hotel"}]});
    res.json(propiedades);
});


//Reporte rango de precios
router.get('/precios', async(req,res)=>{
    const precios = await listingsandreviews.find({$and:[{"price":{$gte:20}},{"price":{$lte:21}}]});
    res.json(precios);
});


router.get('/activo', async(req, res) => {
    const customers = await customer.find();
    console.log(customers);
    res.render('index', { customers });
});

router.put('/NuevoAct/:id', async(req, res) => {
    const { status } = req.body;
    await customer.findByIdAndUpdate(req.params.id, { status });
    req.flash('success_msg', 'Customer Actualizado');
    res.redirect('/customer');
});



//Busquedas por nombre y pais

router.get('/name/:FirstName', async(req,res)=>{
    const name = await customer.find({"FirstName":req.params.FirstName});
    res.json(name);
});

router.get('/country/:country', async(req,res)=>{
    const country = await customer.find({"country":req.params.country});
    res.json(country);
});


//Eliminaciones por nombre y pais

router.delete('/name/delete/:FirstName', async(req,res)=>{
    const name = await customer.remove({"FirstName":req.params.FirstName});
    res.json(name);
});

router.delete('/country/delete/:country', async(req,res)=>{
    const country = await customer.remove({"country":req.params.country});
    res.json(country);
});



module.exports = router;