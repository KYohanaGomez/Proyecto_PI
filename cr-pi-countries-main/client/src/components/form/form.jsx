import React, { useEffect, useState } from 'react';
import validation from '../validation/validation';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './form.css'
import { addActivity } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Form = ({postActivity}) => {

  const dispatch = useDispatch()

  const [aux, setAux]= useState(false)
  
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
     setNewActivity({...newActivity, [property]: value})//modifico el estado y le doy el nuevo valor
     setErrors(validation({...newActivity, [property]:value}))
  }
  const handleChangeCountries = (event)=>{
    const property = event.target.name;
    setCountries([...countries, event.target.value])
    const pusheo = newActivity.countries.push(event.target.value)
    setNewActivity({...newActivity, pusheo})
    setErrors(validation({...newActivity, pusheo}))
  }

  const handleSubmit = (event) => {
    if (
      errors.name !== 'Se requiere el nombre' &&
      errors.name !== '✔' &&
      errors.name !== ''
    ) {
      window.alert('Datos erroneos en nombre');
      event.preventDefault(); 
    } else if (
      errors.difficulty !== 'Se requiere un nivel de dificultad' &&
      errors.difficulty !== '✔' &&
      errors.difficulty !== ''
    ) {
      window.alert('Datos erroneos en dificultad');
    } else if (
      errors.duration !== 'Se requiere un tiempo de duracion' &&
      errors.duration !== '✔' &&
      errors.duration !== ''
    ) {
      window.alert('Datos erroneos en duracion');
    } else if (
      errors.season !== 'Se requiere una temporada' &&
      errors.season !== '✔' &&
      errors.season !== ''
    ) {
      window.alert('Datos erroneos en temporada');
    } else if (
      errors.countries !== 'Se requieren paises' &&
      errors.countries !== '✔' &&
      errors.countries !== ''
    ) {
      window.alert('Datos erroneos en paises');
    } else {
      event.preventDefault();
      postActivity(newActivity);
      setAux(true)
      setNewActivity({ name: '', difficulty: '', duration: '', season: '',countries: [] });
      setErrors({ name: '', difficulty: '', duration: '', season: '',countries: [] });
      setCountries([]);
    }
  };

  useEffect(()=>{
    if (aux) {
      dispatch(addActivity())
      setAux(false)
    }
  },[aux]);

  const allCountries = useSelector((state)=>state.allCountries)
  const mapeo = allCountries?.map(({id, name}) => ({id, name}))
  const list = mapeo.sort((a,b)=>a.name.localeCompare(b.name))

  const seasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']  
  
  return (
    <form  className='form' onSubmit={handleSubmit}>
       <NavLink to='/home'>
        <button  className='home'>Home</button>
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
         <select onChange={handleChange} name='season'>
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
         <select onChange={handleChangeCountries} name='countries'>
          <option value="">seleccione</option>
          {list?.map((all)=>(
            <option key={all.id} value={[all.id]}>
            {all.e}{all.name} ({all.id})
            </option>
          ))}
         </select>
         <label>{errors.countries? <label className={errors.countries === "✔" ? "nameOk" : "nameError"}> {errors.countries}</label>:<p></p>} </label>
              
         <div className='div'>
         {countries.map((coun)=>(
             <button className="butonDele" type='reset' value={coun} 
             onClick={(event)=>{setCountries(countries.filter((e)=> e !== event.target.value));
             setNewActivity({...newActivity, country: countries.country.length ? countries.country.filter((e)=> e !== event.target.value) : ""} )}}>{coun}</button> 
             ))}
          </div>
       </div>
        <button className='boton' type="submit">Submit</button>
    </form>
  )
}

export default Form;