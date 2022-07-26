import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex  from 'knex'

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'air',
      password : '',
      database : 'projekt2'
    }
  });

  db.select("*").from("users").then(data => {
    console.log(data)
  })

const app = express()

app.use(express.json());
app.use(cors());

const database = { 
    users: [
    {
    id: "123",
    name: "John",
    email: "john@gmail.com",
    password: "cookies",
    entries: 0,
    joined: new Date()
},

{
    id: "124",
    name: "Sally",
    email: "sally@gmail.com",
    password: "snowman",
    entries: 0,
    joined: new Date()
}

]

}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
      .where('email', '=', req.body.email)
      .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
          return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentials')
        }
      })
      .catch(err => res.status(400).json('wrong credentials'))
  })

  app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    if(!email || !name || password) {
        return res.status(400).json("INCORRECT FORM SUBMISSION")
    }
    const hash = bcrypt.hashSync(password);
      db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('unable to register'))
  })

// app.put('/image', (req,res) => {

//     const { id } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true
//             user.entries++
//             return res.json(user.entries)
//         } 

//         if(!found ) {
//             res.json("not found")
//         }
//     }
// )

// })

app.listen(3000, () => {
    console.log("app is running on port 3000")
})