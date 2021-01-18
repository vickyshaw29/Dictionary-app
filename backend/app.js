const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
mongoose.connect('mongodb+srv://vickyP:Vicky29@cluster0.dorw7.mongodb.net/Dict?retryWrites=true&w=majority', { useNewUrlParser: true }).then(res => {
    console.log('mongoose is connected')
})
const wordSchema = new mongoose.Schema({
    word_id: {
        type: String
    },
    id: {
        type: String
    },
    data: {
        type: String
    }
})
const Sign = mongoose.model('Sign', wordSchema)
const app = express()
app.use(express.json())
app.get('/api/words', async (req, res) => {
    try {
        const { app_key } = req.headers
        console.log(app_key)
        if (app_key) {
            const data = await Sign.find()
            const response = await res.json({ msg: 'successfull get request', payload: data})
            
        }
        res.json({msg:"please provide your app_key to enter this site"})
    } catch (err) {
        console.log(err)
    }

})
app.post('/api/words', async (req, res) => {
    try {

        const app_id = req.headers.app_id
        const app_key = req.headers.app_key
        // console.log(app_id,app_key)
        const source_lang = 'en-gb'
        // console.log(word_id)
        const word_id = req.headers.word_id.toLowerCase()
        const doMatch = await Sign.findOne({ word_id: word_id })
        if (!doMatch) {
            const response = await fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/${source_lang}/${word_id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "app_id": app_id,
                    "app_key": app_key,
                    "word_id": word_id
                }
            })
            const result = await response.json()
            const data = await result.results.map(a => a.lexicalEntries.map(b => b.entries.map(c => c.senses[0]).map(d => d.definitions[0])))
            const id = await result.results.map(a => a.lexicalEntries.map(b => b.lexicalCategory['id']))
            // res.send(id)
            const user = new Sign({
                word_id: word_id,
                data: JSON.stringify(data),
                id: JSON.stringify(id)
            })
            user.save()
            res.json({ status: 'success', payload: user, msg: "you have successfully added your word" })
        }
        const user = await Sign.find({ word_id })
        res.json({ msg: "match found in the database", payload: user })


    } catch (err) {
        console.log(err)
    }

})





app.listen(8000, () => {
    console.log('running on port 8000')
})