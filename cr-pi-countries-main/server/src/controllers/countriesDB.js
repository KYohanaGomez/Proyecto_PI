const countriesApi = require("./countriesApi")
const { Country } = require("../db")

//esta función verifica la existencia de datos en la base de datos (utilizando un país con ID "KEN" como 
//referencia), y si no hay datos, carga información de países desde una API externa y la inserta en la base de datos utilizando Sequelize. Responde con los países insertados en la base de datos o con un mensaje de error según sea necesario.
const countriesDB = async (req, res)=>{
    try {
        if (!await Country.findOne({where:{id:"KEN"}})) {
            let data = await countriesApi()
            const countries = await Country.bulkCreate(data)
            return countries
        }
    } catch (error) {
        res.status(500).send("error al cargar los paises")
        
    }
}

module.exports = countriesDB;