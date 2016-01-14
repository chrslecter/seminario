var express = require('express');
var router = express.Router();
var objectID = require('mongodb').objectID;

function getApi(db){

    var alumnos = db.collection('alumnos'); /////////// COLECTION TO USE
    var eventos = db.collection('eventos');

    var horarios = db.collection('horarios'); /////////// COLECTION TO USE

        router.post('/login', function(req, res) {
              var user = {"alumCorreo":req.body.usuario};
               alumnos.findOne(user, function(err, docs){
                 if(err){
                         res.status(401).json(docs);
                       }else{
                         if(docs){
                              if(docs.password==req.body.contrasenia){
                                req.session.usuario = docs.alumCodigo;
                                req.session.nombre = docs.alumNombre;
                                req.session.curso = docs.curso;
                                req.session.status = "ok";

                                res.status(200).json(docs);
                              }else{
                                res.status(200).json(docs=null);
                              }
                            }else{
                              res.status(200).json(docs);
                            }
                          }
                      });
            });

    //Pass inicio
    router.post('/pass', function(req, res) {

      var query = {"alumCodigo":parseInt(req.session.usuario)};
      var et = {"$set":{"password":req.body.contrasenia}};

           alumnos.updateOne(query,et,
             function(err, docs){
               if(err){
                       res.status(500).json({error:err});
                     }else{
                       console.log(docs);
                              res.status(200).json({resultado:docs});
                            }

                    });
          }
        );
    //pass fin
    ///////////////////////////////////////////////////////////
// LISTAS
    router.get("/getNotas", function(req,res){
           var query = {"alumCodigo":parseInt(req.session.usuario)};

           alumnos.findOne(query, function(err, doc){
               if(err){
                   res.status(500).json({"error":"Error al extraer el Backlog"});
               }else{

                   res.status(200).json(doc);
               }
           });
       });


       //eventos

       router.get("/getEventos", function(req,res){

              eventos.find({}).toArray(function(err, docs){

                      res.status(200).json(docs);

              });
          });
//////////////////////////////////////////////////////////////////////////////////////////
//  logout
    router.get('/logout', function(req, res){
        console.log("E1TC");
        req.session.destroy();
        console.log("ETC");
        res.status(200).json({"ok":true});
    });
////////////////////////////////////////////////////////////////////////////////////////////
router.get("/getHorarios", function(req,res){
       var query = {"curso":req.session.curso};

       horarios.findOne(query, function(err, doc){
           if(err){
               res.status(500).json({"error":"Error al extraer el Backlog"});
           }else{

               res.status(200).json(doc);
           }
       });
   });


////////////////////////////////////////////////////////////////////////////////////////////
    return router;
} //getAPIRoutes

module.exports = getApi;
