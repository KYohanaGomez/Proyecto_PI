const { Country, Activity } = require("../db");


//esta función maneja la solicitud para obtener un país específico por su ID desde la base de datos, incluyendo 
//las actividades relacionadas, realiza la consulta utilizando Sequelize, verifica si se encontró el país y responde adecuadamente según el resultado del proceso.
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
