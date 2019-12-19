// MODULOS, SO E  APOO =73
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
require('./models/Usuario')
require('./models/Curso')
require('./models/Upload')
const Usuario = mongoose.model('usuarios')
const Curso = mongoose.model('cursos')
const Upload = mongoose.model('uploads')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./atlas/db')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


//  SESSIONS & FLASH
app.use(session({
    secret: "secret-session",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//  MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//  MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

// BODY-PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// HANDLEBARS VIEW ENGINE
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// STATIC
app.use(express.static(__dirname + '/views/public'))

// MONGOOSE
mongoose.Promise = global.Promise

mongoose.connect(db.mongoURI, {useNewUrlParser: true}).then(() => {
    console.log('conectando ao BD..')
}).catch((err) => {
    console.log('falha ao conectar ao BD..' + err)
})

//ROUTES
// GET ROUTES

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/registro', (req, res) => {
    res.render('public/registro')
})

app.get('/login', (req, res) => {
    res.render('public/_login')
})

app.get('/home', (req, res) => {

    Upload.find().then((uploads) => {
        res.render('home', { uploads: uploads })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao listar")
        res.redirect('home')
    })
})



//  POST ROUTES
app.post('/cadastro', (req, res) => {

    let errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ msg: "Nome inválido!" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        errors.push({ msg: "Email inválido!" })
    }
    if (req.body.senha.length < 3) {
        errors.push({ msg: "Senha muito curta.." })
    }
    if (errors.length > 0) {
        res.render("public/registro", { errors: errors })
    }
    else {
        Usuario.findOne({ nome: req.body.nome }).then((usuario) => {
            if (usuario) {
                errors.push({ msg: "Nome já cadastrado!"})
            }
            if (errors.length > 0){
                res.render("public/registro", { errors: errors })
            }
            else {
                Usuario.findOne({ email: req.body.email }).then((usuario) => {
                    if(usuario) {
                        errors.push({ msg: "Email já cadastrado!"})
                    }
                    if (errors.length > 0){
                        res.render("public/registro", { errors: errors })
                    }
                    else{
                        newUsuario = new Usuario({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: req.body.senha,
                            endereco: req.body.endereco
                        })

                        newUsuario.save().then(() => {
                            console.log('Usuario cadastrado com sucesso' + newUsuario)
                            res.redirect('/login')
                        }).catch((err)=>{
                            console.log('Erro interno ao cadastrar'+err)
                        })
                    }

                })


            }
        })

    }
})

app.post('/logar', (req, res) => {

    let errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ msg: "Login inválido!" })
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        errors.push({ msg: "Senha inválida!" })
    }
    if (errors.length > 0) {
        res.render('public/_login', {errors: errors})
    }
    else {
        Usuario.findOne({ nome: req.body.nome }).then((usuario) => {
            if(!usuario){
                errors.push({ msg: "Login incorreto" })
            }
            if (errors.length > 0){
                res.render('public/_login', {errors: errors})
            }
            else{
                Usuario.findOne({ senha: req.body.senha }).then((usuario) => {
                    if(!usuario){
                        errors.push({ msg: "Senha incorreta" })
                    }
                    if (errors.length > 0){
                        res.render('public/_login', {errors: errors})
                    }
                    else{
                        res.render('home')
                    }
                })
            }
        })
    }
})

app.post('/add', (req, res) => {

    let errors = []

    if (!req.body.tema || req.body.tema == undefined || req.body.tema == null) {
        errors.push({ msg: "Tema inválido!" })
    }

    if (errors.length > 0) {
        res.render('home', { errors: errors })
    }
    else {

        newCurso = new Curso({
            tema: req.body.tema,
            descricao: req.body.descricao
        })

        newCurso.save().then(() => {
            req.flash("success_msg", "Curso adicionado com sucesso")
            res.redirect('/home')
        }).catch((err) => {
            req.flash("error_msg", "Falha ao adicionar")
            res.redirecct('/home')
        })
    }

})

app.post('/home/upload', upload.single("file"), async (req, res) => {
    const upload = await Upload.create({
        nome: req.body.nomeF,
        name: req.file.originalname,
        size: req.file.size, 
        key: req.file.filename,
    })
    res.send('ok')
})
// PORT 
const PORT = process.env.PORT || 30000

app.listen(PORT)

