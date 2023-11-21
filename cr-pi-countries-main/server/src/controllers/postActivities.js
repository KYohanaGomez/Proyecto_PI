const { Activity } = require("../db");

const postActivities = async (req, res) =>{
    try {
        const { name, difficulty, duration, season, countries} = req.body;

        const resp = await Activity.create({name, difficulty, duration, season})

        resp.addCountries(countries)
       
        if(!duration|| !name || !difficulty || !season) throw Error("Faltan datos");
        res.status(201).json(resp)      
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = postActivities;