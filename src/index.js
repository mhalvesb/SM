// Variaveis
const express = require("express"); 
const session = require("express-session");
const app = express();
const MemoryStore = require("memorystore")(session) 
const sequelize = require("sequelize");
const bodyParser = require("body-parser"); 
const handlebars = require("express-handlebars"); 
const path = require("path"); 
const usuarios = require("../models/usuariosdb");
const posts = require("../models/postsdb");
const comentarios = require("../models/comentariosdb"); 
const passport = require("passport"); 
require("../config/auth")(passport); 
const flash = require("connect-flash"); 
const auths = require("../routes/authen"); 
const { Console } = require("console"); 
const { post } = require("../routes/authen");
const fileUpload = require("express-fileupload"); 
const rotas = express.Router();
const port = process.env.PORT || 9001; // porta para inicialização do servidor


   

// Declaração da sessão
app.use(session({
    secret: "curso", 
    resave: true, 
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }, 
    store: new MemoryStore({
      checkPeriod: 86400000 
    })
}));


//  Middleware
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash()); 
app.use(fileUpload());
app.use(express.json());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg"); 
    res.locals.error = req.flash("error"); 
    next();
});

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "../../" + "public")));
app.use(express.static(path.join(__dirname, "views"))); 
path.join(process.cwd(), 'src');
app.use("/auth", auths); 

//Engine
app.engine("handlebars", handlebars.engine({ 
    defaultLayout: path.join(__dirname + "/views/layouts/main"),
    layoutsDir: path.join(__dirname, '..', "views", "layouts")
}))
app.set("view engine", "handlebars"); 
app.set("views", path.join(__dirname, "..", "views"));


//Rotas

app.get("/", (req, res)=>{

 /*
    Utilizado somente para redirecionar o usuario para a página correta.
*/

    res.redirect("/auth/login");
})



app.get('/profile', (req, res)=>{
    let post = [];
    let coments = [];

    if(!req.user || req.user == undefined || req.user == null){
        res.redirect("auth/login");
    } 
    else
    {
        const user = req.user;
            posts.findAll({include: comentarios, order: [['id', 'DESC']]}).then((postagem) =>{
            res.render(__dirname + "/views/layouts/menu", {nome: user.nome, post: postagem, nacionalidade: user.nacionalidade, genero: user.gen, profileimg: user.profileimage, birthday: user.birthday});
        });
    }
});

app.post('/profile', (req, res)=>{
    if(req.body.tipo == "postagem"){
        posts.create({
            nome: req.user.nome,
            tipodepost: req.body.postar,
            personid: req.user.id,
            profileimage: req.user.profileimage
        }).then((result)=>{
           return res.redirect('/profile');
        });
    } else if(req.body.tipo == "comentario"){
        comentarios.create({
            nome: req.user.nome,
            postid: req.body.postsid,
            comentario: req.body.comentar,
            profileimage: req.user.profileimage
        }).then((result)=>{
            return res.redirect('/profile');
        });
    }
    
});

app.get("/logout", (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success_msg", "Deslogado com sucesso");
        res.redirect("/auth/login");
    });
});

app.get("/edit", (req, res)=>{
        if(!req.user || typeof req.user == undefined || req.user == null){
            res.redirect("/auth/login");
        } 
        else
        {
        const user = req.user;
        res.render(__dirname + "/views/layouts/perfil", { email: user.email, user: user.dataValues});
        }
        
})

app.post("/edit", (req, res)=>{
    let filename;
    if(req.files){
        let file = req.files.sampleFile
        filename =  req.user.id + file.name
        
        file.mv(__dirname + "/../public/imagens/uploads/" + filename, function(err){
            if(!err){
               return usuarios.findOne({where: {login: req.user.login}}).then((usuario)=>{
                return usuario.update({
                    profileimage: "/imagens/uploads/" + filename
               })
               });
            }
        })
        
    }

    posts.findAll({where: {personid: req.user.id}}).then((post)=>{
        
        /*
        Tem como proposito atualizar a lista de postagem conforme os nomes e as fotos foram alteradas
        */

        if(post){
            for(let i in post){
                if(req.body.nome){
                    post[i].update({
                        nome: req.body.nome
                    });
                }
                
                if(filename){
                    post[i].update({
                        profileimage: "/imagens/uploads/" + filename
                    });
                }
            }
        }
    })
    usuarios.findOne({where: {login: req.user.login}}).then((usuario) =>{
        if(usuario){
            if(req.body.nome){
                usuario.update({
                    nome: req.body.nome
                })
            }
            if(req.body.email){
                usuario.update({
                    email: req.body.email
                });
            }
            if(req.body.nacio){
                    usuario.update({
                    nacionalidade: req.body.nacio
            })
            };
            if(req.body.birthday.length >= 10){
                    usuario.update({
                    birthday: req.body.birthday
                });
            }
            return usuario;
        }
    }).then((data)=>{
        res.redirect("/edit");
    })
    
    
})
app.listen(port, ()=>{
    console.log(port);
})


