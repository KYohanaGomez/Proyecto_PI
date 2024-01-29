const { Country, Activity } = require("../db");


//esta función maneja la solicitud para obtener todos los países de la base de datos, incluyendo las actividades 
//relacionadas, realiza la consulta utilizando Sequelize, verifica si se obtuvieron países y responde adecuadamente según el resultado del proceso.
const getCountries = async (req, res)=>{
    try {
        const countriesAll = await Country.findAll({//busca todos los paises con las actividades relacionadas
            include:{
              model:Activity,
              through:{
                attributes:[]
            },
        }})
        if(!countriesAll.length) throw Error("Error al obtener países")
        res.status(201).json(countriesAll)

    } catch (error) {
        res.status(500).json(error.message);
        
    }
}
module.exports = getCountries;
