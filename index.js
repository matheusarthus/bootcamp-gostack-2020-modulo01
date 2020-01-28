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

server.get('/users', (req,res) => {
  return res.json(users);
})

server.get('/users/:index', (req, res) => {
  // const name = req.query.nome; => Query params
  // const { id } = req.params; => Route params

  const { index } = req.params;

  return res.json(users[index]);
})

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', (req, res) => {
  const { new_name } = req.body;
  const { index } = req.params; 

  users[index] = new_name;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index,1);

  return res.send("Usuário deletado com sucesso!");
})

server.listen(3000);