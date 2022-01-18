import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

//App Config
const app = express() // creating an instance
const port = process.env.PORT || 8001 // defining the port where our application is going to listen
const connection_url = `mongodb+srv://admin:q6Tz50QKeDaOHCi1@cluster0.eww79.mongodb.net/tinderdb?retryWrites=true&w=majority`

//Middlewares
app.use(express.json())
app.use(Cors()) //adding headers to every request and a Security parameter

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true, // used to make our connection smooth as mongoose is still under development
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/', (req,res)=> res.status(200).send('Hello Clever Programmers'));

app.post('/tinder/cards', (req,res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err,data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req,res)=>{
    Cards.find((err,data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, ()=> console.log(`listening on localhost: ${port}`))








