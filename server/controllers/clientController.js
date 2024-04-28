const { Router } = require('express')
const mongoose = require('mongoose')
function createClientController() {
	const Client = mongoose.model('client')
	const router = Router()

	router.get('/client', (_req, res) => {
		Client.find().lean().then((clients) => {
			res.render('client/list', { clients })
		})
	})
	router.get('/client/create', (_req, res) => {
		res.render('client/create')
	})
	router.get('/client/update/:id', (req, res) => {
		Client.findOne({ _id: req.params.id }).lean().then((client) => {
			res.render('client/update', { client })
		})
	})
	router.post('/client/create', (req, res) => {
		const client = new Client()
		client.name = req.body.name
		client.save().then(() => {
			res.redirect('/client')
		}).catch((erro) => {
			res.send('Houve um erro: ' + erro)
		})
	})
	router.post('/client/update/:id', (req, res) => {
		Client.updateOne({ _id: req.params.id }, { name: req.body.name }).then(() => {
			res.redirect('/client')
		})
	})
  
	router.get('/client/delete/:id', (req, res) => {
		Client.deleteOne({ _id: req.params.id }).then(() => {
			res.redirect('/client')
		})
	})

	return router
}

module.exports = { createClientController }