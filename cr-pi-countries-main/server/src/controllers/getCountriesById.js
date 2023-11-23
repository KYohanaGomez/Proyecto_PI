const { Country, Activity } = require("../db");


const getCountriesById = async (req, res)=>{
    try {
        let { id } = req.params;
        if(!id) throw Error("Faltan datos");
        const countries = await Country.findOne({ //busca un pais por id y le incluye la actividad
            where: {
                 id: id 
                },
                include:{
                    model:Activity,
                    through:{
                      attributes:[]
                  },
              }
            });
        if(!countries) throw Error("país no encontrado");
        res.json(countries)

    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = getCountriesById;
