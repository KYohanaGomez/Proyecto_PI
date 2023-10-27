const { Country, Activity } = require("../db");


const getCountriesById = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!id) return res.status(401).send("Faltan datos");
        const countries = await Country.findOne({ where: { id: id }},
       )

    } catch (error) {
        res.json({message:'Error al obtener el id:', error})    
    }
}
module.exports = getCountriesById;
