const countriesApi = require("./countriesApi")
const { Country } = require("../db")

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