const { Router } = require('express')
const mongoose = require('mongoose')
function createBookController() {
	const Book = mongoose.model('book')
	const Client = mongoose.model('client')
	const router = Router()

	router.get('/', (_req, res) => {
		Book.find().populate('client').lean().then((books) => {
			res.render('book/list', { books })
		})
	})
	router.get('/book/create', (_req, res) => {
		res.render('book/create')
	})
	router.get('/book/update/:id', (req, res) => {
		Book.findOne({ _id: req.params.id }).lean().then((book) => {
			res.render('book/update', { book })
		})
	})
	router.get('/book/rent/:id', (req, res) => {
		Book.findOne({ _id: req.params.id }).lean().then((book) => {
			Client.find().lean().then((clients) => {
				if (clients.length === 0) res.send('Não existem clientes registrados, registre alguns e tente novamente...')
				res.render('book/rent', { book, clients })
			})
		})
	})

	router.post('/book/rent/:id', async (req, res) => {
		Book.findByIdAndUpdate(req.params.id, { client: req.body.to_rent }).then(() => {
			res.redirect('/')
		}).catch((err) => res.send('Ocorreu um erro: '+ err))
	})
	router.get('/book/devolve/:id', async (req, res) => {
		Book.findByIdAndUpdate(req.params.id, { client: null }).then(() => {
			res.redirect('/')
		}).catch((err) => res.send('Ocorreu um erro: '+ err))
	})

	router.post('/book/create', (req, res) => {
		const book = new Book()
		book.title = req.body.title
		book.author = req.body.author
		book.save().then(() => {
			res.redirect('/')
		}).catch((err) => {
			res.send('Houve um erro: ' + err)
		})
	})
	router.post('/book/update/:id', (req, res) => {
		Book.updateOne({ _id: req.params.id }, { title: req.body.title, author: req.body.author }).then(() => {
			res.redirect('/')
		})
	})
  
	router.get('/book/delete/:id', (req, res) => {
		Book.deleteOne({ _id: req.params.id }).then(() => {
			res.redirect('/')
		})
	})

	return router
}

module.exports = { createBookController }