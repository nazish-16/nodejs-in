import {createServer} from 'http'
const PORT = 8000

const users = [
    {id: 1, name: 'John doe'},
    {id: 2, name: 'jack doe'},
    {id: 3, name: 'jim doe'},
]

const server = createServer((req,res) =>{
    if(req.url === '/api/users' && req.method === 'GET'){
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(users))
        res.end()
    }
    else{
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({message: 'Invalid'}))
        res.statusCode = 404
        res.end()
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
  });