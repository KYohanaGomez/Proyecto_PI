const axios = require("axios");
const URL = 'http://localhost:5000/countries';

const countriesApi = async (req, res) =>{
    try {
        const { data }= await axios.get(URL)
        if(data){
            const mapeo = data.map(({cca3, name, flags, continents, capital, subregion, area,
            population})=>{
                return{
                    id: cca3 ? cca3 :"",
                    name: name ? name.common :"",
                    flag_image: flags ? flags.png : "",
                    continent: continents ? continents[0] : "",
                    capital : capital ? capital[0] : "",
                    subregion: subregion ? subregion : "",
                    area: area ? area : "",
                    population: population ? population : 0,
                }
            })
            return mapeo;
          } else{
            res.status(404).send("No hay información de paises")
        }
    } catch (error) {
        res.status(500).send("Error en la descarga de los paises")
        
    }
} 
module.exports = countriesApi;