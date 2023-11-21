
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detail.css'


const Detail = ()=> {

  const { id } = useParams();
  const [country, setCountry] = useState([]);//estado local


  useEffect(()=>{
    if(country.length === 0){
      axios.get(`http://localhost:3001/countries/${id}`)
      .then(({data})=>{

        if(data)setCountry(data)
      
    })
    return setCountry({});
  }
  },[id])

  const activities = country.Activities;
 //console.log(activities);
 
    return (
    
      <div className="container">
            <div className="infor">
              <h2>Id: {country?.id}</h2>
              
              <h2>Name:{country?.name}</h2>
              
              <h2>Capital:{country?.capital}</h2>
              
              <h2>Subregion:{country?.subregion}</h2>
           
              <h2>Area:{country?.area}</h2>
             
              <h2>Population:{country?.population}</h2>   
              <img className="detaIMG" src={country?.flag_image}alt="" />
             
            </div>
            
              
            <div className="activ">
             <h2>Activities: </h2>{activities?.map(({id, name, difficulty, duration, season})=>{
               return (
                 <h2 key={id}>
                  Name: {name},
                  Difficulty: {difficulty},
                  Duration: {duration},
                  Season: {season}           
              </h2>)
            })}
      </div>
    </div>
       
        
     
    )
  }
  
  export default Detail;