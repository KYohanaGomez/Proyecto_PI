import React, { useEffect, useState } from 'react';
import validation from './validation';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './form.css'

const Form = ({postActivity, countries, activities}) => {

  const [countriesState, setCountriesState] = useState([])
  const [count, setCount] = useState()
  const [seas, setSeas] = useState()
  const [newActivity, setNewActivity] = useState({//creo un estado de actividades
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
    countries: '',
  })
  const handleChange = (event) =>{
     const property = event.target.name;//asi se que propiedad estoy modificando
     const value = event.target.value;//Se obtiene el nuevo valor de la propiedad desde el evento.
     setNewActivity({...newActivity, [property]: value})//Se actualiza el estado mediante la creación de un nuevo objeto y se copia todas las propied y se actualiza el nuevo value
     setErrors(validation({...newActivity, [property]:value}))//Se llama a la función validation para obtener los errores actualizados basados en el nuevo estado
  }
  // const handleChangeCountries = (event) => {
  //   const { value } = event.target;
  
  //   if (!countriesState.includes(value)) {
  //     setCountriesState([...countriesState, value]);
  
  //     // Creo una nueva copia del array countries usando el spread operator
  //     const newCountries = [...newActivity.countries, value];
  
  //     // Actualizo el estado newActivity con el nuevo array de countries
  //     setNewActivity({ ...newActivity, countries: newCountries });
  
  //     // Actualizo los errores basándome en el nuevo estado de newActivity
  //     setErrors(validation({ ...newActivity, countries: newCountries }));
  //   }
  // };
  
  const handleChangeSeason = (event) => {
     const { value } = event.target
     const { name } = event.target
     setSeas(value)
     setNewActivity({...newActivity, [name]: value})
     setErrors(validation({...newActivity, [name]:value}))
  }

  const handleChangeCountries = (event)=>{
     const { value } = event.target
     setCount(value)
    if (!countriesState.includes(value)) {
      setCountriesState([...countriesState, value])
      const pusheo = newActivity.countries.push(value)
      setNewActivity({...newActivity, pusheo})
      setErrors(validation({...newActivity, pusheo}))
    }
  }


const send = ()=>{
  activities()
  countries();
}

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      errors.name !== 'Se requiere el nombre' &&
      errors.name !== '✔' &&
      errors.name !== ''
    ) {
      event.preventDefault(); 
      window.alert('Datos erroneos en nombre');
    } else if (
      errors.difficulty !== 'Se requiere un nivel de dificultad' &&
      errors.difficulty !== '✔' &&
      errors.difficulty !== ''
    ) {
      event.preventDefault(); 
      window.alert('Datos erroneos en dificultad');
    } else if (
      errors.duration !== 'Se requiere un tiempo de duracion' &&
      errors.duration !== '✔' &&
      errors.duration !== ''
    ) {
      event.preventDefault(); 
      window.alert('Datos erroneos en duracion');
    } else if (
      errors.season !== 'Se requiere una temporada' &&
      errors.season !== '✔' &&
      errors.season !== ''
    ) {
      event.preventDefault(); 
      window.alert('Datos erroneos en temporada');
    } else if (
      errors.countries !== 'Se requieren paises' &&
      errors.countries !== '✔' &&
      errors.countries !== ''
    ) {
      event.preventDefault(); 
      window.alert('Datos erroneos en paises');
    } else { 
      event.preventDefault(); 
      postActivity(newActivity);
      setCount('')
      setSeas('')
      setNewActivity({ name: '', difficulty: '', duration: '', season: '', countries: [] });
      setErrors({ name: '', difficulty: '', duration: '', season: '', countries: '' });
      setCountriesState([]);
    }
    
  };

  const allCountries = useSelector((state)=>state.allCountries)
  const mapeo = allCountries?.map(({id, name}) => ({id, name}))
  const list = mapeo.sort((a,b)=>a.name.localeCompare(b.name))

  const seasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']  



  if (errors.name) {
    if (newActivity.countries.length === 0){
      errors.countries = 'Se requieren paises';
      
    } 
  else errors.countries = '✔';

 
  
  }
  
  return (
    <form  className='form' onSubmit={handleSubmit}>
       <NavLink to='/home'>
        <button onClick={()=>send()} className='home'>Home</button>
        </NavLink>
        <div>
        <h1 className='titulo'>Create your tourist activity !!!</h1>
        </div>
        <hr />
       <div className='div'>
         <label className='label'>Name: </label>
         <input type='text' value={newActivity.name} onChange={handleChange} name='name'/>
         <label>{errors.name? <label className={errors.name === "✔" ? "nameOk" : "nameError"}>  {errors.name}</label>:<p></p>}</label>
         
       </div>
       <hr />
       <div className='div'>
         <label className='label'>Difficulty: </label>
         <input type='text' value={newActivity.difficulty} onChange={handleChange} name='difficulty'/>
         <label>{errors.difficulty? <label className={errors.difficulty === "✔" ? "nameOk" : "nameError"}> {errors.difficulty}</label>:<p></p>}</label>
       </div>
       <hr />
       <div className='div'>
         <label className='label'>Duration: </label>
         <input type='text' value={newActivity.duration} onChange={handleChange} name='duration'/>
         <label> Horas </label>
         <label>{errors.duration? <label className={errors.duration === "✔" ? "nameOk" : "nameError"}> {errors.duration}</label>:<p></p>}</label> 
       </div>
       <hr />
       <div className='div'>
         <label className='label'>Season: </label>
         <select onChange={handleChangeSeason} name='season' value={seas}>
         <option value=''>seleccione</option>
          {seasons.map((seas)=>(
            <option key={seas} value={seas}>
             {seas}
         </option>
          ))}
         </select>
         <label>{errors.season? <label className={errors.season === "✔" ? "nameOk" : "nameError"}> {errors.season}</label>:<p></p>}</label>
         
       </div>
       <hr />
       <div className='div'>
         <label className='label'>Countries: </label>
         <select onChange={handleChangeCountries} name='countries' value={count}>
          <option value="">seleccione</option>
          {list?.map((all)=>(
            <option key={all.id} value={[all.id]}>
            {all.e}{all.name} ({all.id})
            </option>
          ))}
         </select>
         <label>{errors.countries? <label className={errors.countries === "✔" ? "nameOk" : "nameError"}> {errors.countries}</label>:<p></p>} </label>
              
         <div className='div'>
             {countriesState.map((coun)=>(
             <button className="butonDele" type='reset' value={coun} 
             onClick={(event)=>{setCountriesState(countriesState.filter((e)=> e !== event.target.value));
             setNewActivity({...newActivity, countries: countriesState.length ? countriesState.filter((e)=> e !== event.target.value) : ""} )}}>{coun}</button> 
             ))}
          </div>
       </div>
        <button className='boton' type="submit">Submit</button>
    </form>
  )
}

export default Form;