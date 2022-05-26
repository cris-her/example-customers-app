// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const port = process.env.PORT || 3001;

server.use(middlewares)

server.listen(port, () => {
  console.log('JSON Server is running')
})

server.put('/customers/30000001', (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());
    console.log(JSON.stringify(body));
    if (body.age && body.age > 18) {
      console.log("error de validación");
      return res.send({ 
        error: true,
        validation: { 
          age: 'Debe ser menor de edad',
          name: 'El nombre es incorrecto'
        }
      });
    } else {
      res.send('ok');
    }
  });


})

server.use(router)




