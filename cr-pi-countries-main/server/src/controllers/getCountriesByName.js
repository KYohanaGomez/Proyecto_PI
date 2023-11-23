const { Country, Activity } = require("../db");
const { Op } = require("sequelize");


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
