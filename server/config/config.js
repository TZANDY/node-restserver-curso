//=======================================
//  PUERTO
//=======================================
process.env.PORT = process.env.PORT || 3000;



//=======================================
//  ENTORNO
//=======================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";



//=======================================
//  Base de datos
//=======================================
let urlDB;
if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    //urlDB = "mongodb+srv://supadm:jvqFTOQ3UqNeF6PX@cluster0-gbfep.mongodb.net/cafe";
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;