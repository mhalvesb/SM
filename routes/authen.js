const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Strategy } = require("passport-local");
const usuarios = require("../models/usuariosdb");
const authenticateAsync = (strategy, options) => {
    return (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(strategy, options, (err, user, info) => {
                if (err) {
                    return reject(err);
                }

                if (!user) {
                    return reject(info);
                }

                req.logIn(user, (loginErr) => {
                    if (loginErr) {
                        return reject(loginErr);
                    }

                    resolve(user);
                });
            })(req, res, next);
        });
    };
};

router.get('/login', (req, res)=>{

    if(req.user){
        res.redirect('/profile');
    } else{
        res.render(__dirname + '/../src/views/layouts/login');
    }
});


router.post('/login', async (req, res, next)=>{
    
             try {
                const user = await authenticateAsync("local", {
                    successRedirect: "/profile",
                    failureRedirect: "/auth/login",
                    failureFlash: true
                })(req, res, next);
        
             
        
                res.redirect('/profile');
            } catch (error) {
                     console.log(error);
                    res.render(__dirname + "/../src/views/layouts/login", {error: error.message});
                 }
});



router.get('/registro', (req, res)=>{
    res.render(__dirname + "/../src/views/layouts/registro");
});

router.post('/registro', (req, res)=>{
    let erros = [];

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null || req.body.email == ""){
        erros.push({texto: "E-mail invalido"});
    }

   
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || req.body.senha == ""){
        erros.push({texto: "Senha invalida"});
        
    }

    if(!req.body.login || typeof req.body.login == undefined || req.body.login == null || req.body.login == "")
    {
        erros.push({texto: "Login invalido"});
        
    }

    
    if(erros.length > 0){
       return res.render(__dirname + "/../src/views/layouts/registro", {erros: erros});
    }
    
    usuarios.findOne({where: {login: req.body.login}}).then((usuario) =>
    {
            if(usuario){
                erros.push({texto: "Este usuario já existe"});
                return res.render(__dirname + "/../src/views/layouts/registro", {erros: erros});
            }
            else{
                usuarios.create({
                    login: req.body.login,
                    senha: req.body.senha,
                    email: req.body.email,
                    nome: req.body.nome
                });
                res.redirect('/auth/login');
            }
        });
    });


    module.exports = router;