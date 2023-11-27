const { Op } = require("sequelize");
const { Activity } = require("../db");

const postActivities = async (req, res) =>{

    const { name, difficulty, duration, season, countries} = req.body;

    try {

        if(!name || !difficulty || !duration || !season || !countries)  throw Error("Faltan datos")

         else if(await Activity.findOne({where: { name: {[Op.iLike]:name}} })){
            throw Error(`'${name}' ya existe, crea otra actividad`)
         }else{
            const resp = await Activity.create({name, difficulty, duration, season})//creo actividades en la tabla
                resp.addCountries(countries)
                res.status(201).send("Actividad creada con exito!") 
         }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = postActivities;