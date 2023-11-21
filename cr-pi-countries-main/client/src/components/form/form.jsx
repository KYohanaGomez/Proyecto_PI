import React, { useState } from 'react';
import validation from '../validation/validation';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './form.css'




const Form = ({postActivity}) => {
  
  const [countries, setCountries]=useState([])

  const [newActivity, setNewActivity] = useState({
    name : '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],

  })
  const [errors, setErrors] = useState({//creo un estado de errores
    name : '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
  })
  const handleChange = (event) =>{
     const property = event.target.name;//asi se que propiedad estoy modificando
     const value = event.target.value;//es el valor
     setNewActivity({...newActivity, [property]:value})//modifico el estado y le doy el nuevo valor
     setErrors(validation({...newActivity, [property]:value}))
  }
  const handleChangeCountries = (event)=>{
    setCountries([...countries,event.target.value])
    const pusheo = newActivity.countries.push(event.target.value)
    setNewActivity({...newActivity, pusheo})
    setErrors(validation({...newActivity, pusheo}))
  }
  const handleSubmit =(event)=>{
    event.preventDefault();
    postActivity(newActivity)
  }
  const allCountries = useSelector((state)=>state.allCountries)
  const cb = [{e:'seleccione'}]
  const mapeo = allCountries?.map(({id, name}) => ({id, name}))
  const list = mapeo.sort((a,b)=>a.name.localeCompare(b.name))
  const arr = cb.concat(list)

  const deleteCountry =(event) => {
    const name = event.target.value;
    const newArr = newActivity.countries.filter(country=>{
      return country !== name;
    })
    setNewActivity({...newActivity, countries: newArr})
    }



  const season = ['seleccione','verano', 'otoño', 'invierno', 'primavera']  
 
  
  return (
    <form  className='form' onSubmit={handleSubmit}>
       <NavLink to='/home'>
        <button  className='home'>Home</button>
        </NavLink>
       <div >
         <label>Name: </label>
         <input type='text' value={newActivity.name} onChange={handleChange} name='name'/>
         {errors.name? <p>{errors.name}</p>:<p>...</p>}
       </div>

       <div>
         <label>Difficulty: </label>
         <input type='text' value={newActivity.difficulty} onChange={handleChange} name='difficulty'/>
         {errors.difficulty? <p>{errors.difficulty}</p>:<p>...</p>}
       </div>

       <div>
         <label>Duration: </label>
         <input type='text' value={newActivity.duration} onChange={handleChange} name='duration'/>
         {errors.duration? <p>{errors.duration}</p>:<p>...</p>}
       </div>

       <div>
         <label>Season: </label>
         <select onChange={handleChange}>
          {season?.map((seas)=>(
            <option key={seas} value={seas}>
             {seas}
         </option>
          ))}
         </select>
         {errors.season? <p>{errors.season}</p>:<p>...</p>}
       </div>

       <div>
         <label>Countries: </label>
         <select onChange={handleChangeCountries}>
          {arr?.map((all)=>(
            <option key={all.name} value={[all.id]}>
            {all.e}{all.name} ({all.id})
            </option>
          ))}
         </select>
         {errors.countries? <p>{errors.countries}</p>:<p>...</p>}      
         <p>{countries.join(', ')}</p>
       </div>
        <button className='boton' type="submit">Submit</button>
        <button onClick={deleteCountry} value={name}>❌</button>
    </form>
  )
}

export default Form

