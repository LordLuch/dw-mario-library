const mongoose = require('mongoose')
require('dotenv/config')
async function connectDatabase() {
	console.log('> [db] Estabelecendo conexão com o MongoDB!')
	await mongoose.connect(process.env['MONGODB_URL'] ?? 'mongodb://127.0.0.1/library')
	console.log('> [db] Conexão estabelecida com o MongoDB!')
	console.log('> [db] Criando tabelas...')
	createTables({ mongoose })
	console.log('> [db] Tabelas criadas!')
	return mongoose
}

function createTables({ mongoose }) {
	const book = new mongoose.Schema({
		title: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'client',
			default: null
		}
	})
  
	const client = new mongoose.Schema({
		name: {
			type: String,
			required: true
		}
	})
  
	mongoose.model('book', book)
	mongoose.model('client', client)
}


module.exports = { connectDatabase }
