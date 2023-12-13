const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Usuario = require("../models/usuariosdb");




module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: "login", passwordField: "senha"}, (login, senha, done)=>{
       Usuario.findOne({where: {login: login}}).then((usuario)=>{
        if(!usuario || usuario == undefined || usuario == null){
            return done(null, false, {message: "Esta conta não existe"});
        }
        if(senha == usuario.senha){
            return done(null, usuario)
        } else{
            return done(null, false, {message: "Senha incorreta"});
        }
       })
    }));
}
passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)
});

passport.deserializeUser((id, done)=>{
    Usuario.findByPk(id).then(user =>{
        done(null, user);
    }).catch(err =>{
        done(err);
    })
})