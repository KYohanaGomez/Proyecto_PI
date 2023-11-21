const { Activity, Country } = require("../db");


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
