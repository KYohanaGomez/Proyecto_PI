const { Country, Activity } = require("../db");
const { Op } = require("sequelize");


//esta función maneja la solicitud para obtener todos los países de la base de datos que coincidan con un nombre 
//proporcionado, incluyendo las actividades relacionadas, realiza la consulta utilizando Sequelize, verifica si se encontraron países y responde adecuadamente según el resultado del proceso.
const getCountriesByName = async (req, res)=>{
    try {
       let { name } = req.query;
        if(!name) throw Error('Faltan datos');
        const resp = await Country.findAll({ //busca toods los paises que coicidan con el nombre y le agrega la actividad
            where: {
                name: {
                    [Op.iLike]:name
                }
            },
            include:{
                model:Activity,
                through:{
                  attributes:[]
              },
          }
        });
        if(!resp.length)throw Error("No se encontraron países que coincidan con el nombre proporcionado")
        res.status(201).json(resp);

    } catch (error) {
        res.status(500).json(error.message);    
    }
}
module.exports = getCountriesByName;
