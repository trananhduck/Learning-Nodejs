const express = require('express')
const app = express()
const path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

const AccountModel = require('./models/Account')
const PAGE_SIZE = 2

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/user', (req, res, next) => {
    let page = req.query.page;
    if (page) {
        page = parseInt(page)
        if (page < 1) {
            page = 1
        }
        let soLuongBoQua = (page - 1) * PAGE_SIZE
        AccountModel.find({})
            .skip(soLuongBoQua)
            .limit(PAGE_SIZE)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json("loi server")
            })
    } else {
        // This block will only execute if `page` is not provided
        AccountModel.find({})
            .skip(soLuongBoQua)
            .limit(PAGE_SIZE)
            .then(data => {

                AccountModel.countDocuments({}).then((total) => {
                    console.log(total);
                    let tongSoPage = Math.ceil(total / PAGE_SIZE)
                    res.json({
                        tongSoPage: tongSoPage,
                        data: data,
                    })
                })

            })
            .catch(err => {
                res.status(500).json('loi server')
            })
    }
});


app.listen(3000)