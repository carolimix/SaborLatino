
const router = require("express").Router();
const Service = require("../models/service.model");

//create service
router.get('/services/create', (req, res) => {
    res.render('services/new-service')
});

router.post('/services/create', (req, res) => {
    const {name, description, contactInfo, owner } = req.body

    Service.create({
        name,
        description,
        contactInfo,
        owner: req.user._id
    })
        .then(createdService => res.redirect('/services'))
        .catch(err => ("services/new-service"))
});

//get service
router.get('/services', (req, res) => {
	Service.find()
		.then(services => res.render('services/services', { services }))
		.catch(err => console.log(err))
});

//get details
router.get("/services/:id", (req, res) => {
    const id= req.params.id

    Service.findById(id)
    .then(service => res.render("services/services-details", {service}))
    .catch(err=> console.log(err))
})

//delete service
router.get('services/:id/delete', (req, res) => {
	const id = req.params.id
	/* const query = { _id: id }
	if (req.user.role !== 'admin') {
		query.owner = req.user._id
	} */
	Service.findByIdAndRemove(id)
		.then(deletedService => res.redirect('/services'))
		.catch(err => console.log(err))
});

//edit service
router.get("/celebrities/:id/edit", (req, res) => {
    const id = req.params.id

    Celebrity.findById(id)
    .then(celebrity => {
        res.render("celebrities/edit-celebrity", { celebrity })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/services/:id/edit", (req, res) => {
    const id = req.params.id
    const { name, description, contactInfo, owner } = req.body

    const celebrity = {
        name,
        description,
        contactInfo,
        owner
    }

    Celebrity.findByIdAndUpdate(id, service)
    .then(createdService => {
        res.redirect(`/services/${id}`)
    })
    .catch(err => console.log(err))
})

module.exports = router;