const { Activity, Country } = require("../db");

//esta función maneja la solicitud para obtener todas las actividades de la base de datos, realiza la 
//consulta utilizando Sequelize, verifica si se obtuvieron actividades y responde adecuadamente según el resultado del proceso.
const getActivities = async (req, res)=>{
    try {
        const activitiesAll = await Activity.findAll(
            {
                include:{
                  model:Country,
                  //attributes: ["name"],
                  through:{
                    attributes:[]
                },
            }}
        )
        if(!activitiesAll.length) throw Error ("Error al obtener actividades")
        res.status(200).json(activitiesAll)

    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = getActivities;
