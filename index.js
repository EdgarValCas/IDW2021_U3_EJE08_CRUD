var mongoose = require('mongoose');
var schema = require('./squema');

mongoose.connect('mongodb://localhost:27017/eje05');

var Person = mongoose.model("Person", schema, "persons");

var person = new Person({
    title: "Nuevo integrante",
    author: "Edgar Valderrama Castillo",
    body: "El nuevo integrante tiene muchas habillidades para la programación",
    comments: [
        {
            body: "---Comentario---",
            date: "20/06/2021",
        },
    ],
    meta: [{
        votes: 34,
        fav: 2,
    },
    ],
});

person.save(function (error) {
    if (error) {
        console.log(console.error());
        process.exit(1);
    }
    console.log("Creación exitosa");
    Person.find({}, function (error, docs) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("---- Consulta general 1 ----");
        console.log(docs);
        Person.update(
            {
                _id: "609347e0c658aa25203ff15f",
            },
            {
                $set: {
                    author: "Edgar Valderrama",
                },
            },
            function (error, docs) {
                if (error) {
                    console.log(error);
                    process.exit(1);
                }
                console.log("---- Actualización ----");
                console.log(docs);
                Person.find({}, function (error, docs) {
                    if (error) {
                        console.log(error);
                        process.exit(1);
                    }
                    console.log("---- Consulta general 2 ----");
                    console.log(docs);
                    Person.findByIdAndRemove(
                        { _id: "609014e089109f25303f6457" },
                        function (error, docs) {
                            if (error) {
                                console.log(error);
                                process.exit(1);
                            }
                            console.log("---- Eliminación ----");
                            console.log(docs);
                            Person.find({}, function (error, docs) {
                                if (error) {
                                    console.log(error);
                                    process.exit(1);
                                }
                                console.log("---- Consulta general 3 ----");
                                console.log(docs);
                                process.exit(0);
                            });
                        }
                    );
                });
            }
        );
    });
});