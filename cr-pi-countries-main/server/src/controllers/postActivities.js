const { Activity } = require("../db");

const postActivities = async (req, res) =>{

    try {
        const { name, difficulty, duration, season, countries} = req.body;

        if(!duration|| !name || !difficulty || !season || !countries)  throw Error("Faltan datos");

        const resp = await Activity.create({name, difficulty, duration, season})//creo actividades en la tabla

        resp.addCountries(countries)
       
        res.status(201).send("Actividad creada con exito!")      
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = postActivities;