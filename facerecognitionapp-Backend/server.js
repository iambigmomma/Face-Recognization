const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');//因為怕是有hacker要我們從前端發送request去下載不好的東西
const knex = require('knex');

const register = require('./controller/register.js');
const signin = require('./controller/signin.js');
const profile = require('./controller/profile.js');
const image = require('./controller/image.js');

const db = knex({
  	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'iambigmomma',
    password : '',
    database : 'smart-brain'
	}
});

console.log(db.select('*').from('users'));

const app = express();

app.use(bodyParser.json());
app.use(cors());


const database = {
	user: [
	{
		id: '123',
		name:'Jeff',
		email:'jeff.fan27@gmail.com',
		password:'www',
		entries:0,
		joined: new Date()

	},
	{
		id: '456',
		name:'Cool',
		email:'cool@gmail.com',
		password:'ccc',
		entries:0,
		joined: new Date()

	}
	],
	login: [
		{
			id:'998',
			hash:'',
			email:'jeff.fan27@gmail.com'
		}
	]
}
 



 
// Load hash from your password DB.
/*bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/


app.get('/', (req, res)=> {
	res.send(database.user);
})
app.post('/signin',  (req, res) =>{ signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>{ register.handleRegister(req, res, db, bcrypt)})
	
app.get('/profile/:id', (req, res) =>{ profile.handleProfile(req, res, db)})

app.put('/image', (req, res) =>{ image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) =>{ image.handleAPICall(req, res)})

app.listen(3000, ()=>{
	console.log('app is running on port 3000');
})