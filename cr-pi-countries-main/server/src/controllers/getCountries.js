const { Country } = require("../db");


const getCountries = async (req, res)=>{
    try {
        const countriesAll = await Country.findAll()
        res.json(countriesAll)

    } catch (error) {
        res.json({message:'Error al obtener países:', error})
        
    }
}
module.exports = getCountries;
