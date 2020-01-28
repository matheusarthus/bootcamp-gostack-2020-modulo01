const express = require('express');

const server = express();

server.use(express.json());

const users = ['Matheus', 'Victor', 'Denis']

//use é um middleware global, ele executa independente da rota chamada

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required." });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'User does not exist.' });
  }

  return next();
}

server.get('/users', (req,res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  // const name = req.query.nome; => Query params
  // const { id } = req.params; => Route params

  const { index } = req.params;

  return res.json(users[index]);
})

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { new_name } = req.body;
  const { index } = req.params; 

  users[index] = new_name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index,1);

  return res.send("Usuário deletado com sucesso!");
})

server.listen(3000);