import React, { useEffect, useState } from 'react';
import validation from './validation';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './form.css'

const Form = ({postActivity, countries, activities}) => {

  const [countriesState, setCountriesState] = useState([])//declaro el estado countriesState y la función para actualizarlo setCountriesState.
  const [count, setCount] = useState()//declara el estado count y la función para actualizarlo setCount utilizando el hook useState.
  const [seas, setSeas] = useState()//declaro el estado seas y la función para actualizarlo setSeas.
  const [newActivity, setNewActivity] = useState({//creo un estado de actividades y la funcion para actualizarlo
    name : '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],

  })
  const [errors, setErrors] = useState({//creo un estado de errores y la funcion para actualizarlo
    name : '',
    difficulty: '',
    duration: '',
    season: '',
    countries: '',
  })
  const handleChange = (event) =>{//se utiliza para manejar los campos de entrada de formulario,actualiza el stado
     const property = event.target.name;//asi se que propiedad estoy modificando
     const value = event.target.value;//Se obtiene el nuevo valor de la propiedad desde el evento.
     setNewActivity({...newActivity, [property]: value})//Se actualiza el estado mediante la creación de un nuevo objeto y se copia todas las propied y se actualiza el nuevo value
     setErrors(validation({...newActivity, [property]:value}))//Se llama a la función validation para obtener los errores actualizados basados en el nuevo estado
  }
  console.log(countriesState);
  const handleChangeSeason = (event) => {//maneja cambios específicos para las selecciones de temporada 
    const { value } = event.target 
    const { name } = event.target
     setSeas(value)
     setNewActivity({...newActivity, [name]: value})
     setErrors(validation({...newActivity, [name]:value}))
  }

  const handleChangeCountries = (event)=>{//maneja cambios específicos para las selecciones de paises 
     const { value } = event.target
     setCount( value )
    if (!countriesState.includes(value)) {
      setCountriesState([...countriesState, value])
      const pusheo = newActivity.countries.push(value)
      setNewActivity({...newActivity, pusheo})
      setErrors(validation({...newActivity, pusheo}))
    }
  }
  // if (newActivity.countries.length === 0) {
  //   setCount('')
  // }

  if (errors.name) {
    if (newActivity.countries.length === 0){
      errors.countries = 'Se requieren paises';    
    } 
    else errors.countries = '✔'; 
  }

 const send = ()=>{//se llama en el botón "Home" y ejecuta las funciones activities y countries.
   activities()
   countries();
  }
  //esta función se utiliza para manejar el evento de envío del formulario,previene que se recarga de página 
 // y realiza una operación asincrónica, y maneja cualquier error que pueda ocurrir durante este proceso mostrando una alerta al usuario.
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await postActivity(newActivity);
      
    } catch (error) {
      window.alert('Error al enviar la actividad:', error);
    }

    const { name, difficulty, duration, season, countries } = newActivity

    if (name !== "" && difficulty !== "" && duration !== "" && season !== "" && countries.length !== 0) {
      setCount('');
      setSeas('');
      setNewActivity({ name: '', difficulty: '', duration: '', season: '', countries: [] });
      setErrors({ name: '', difficulty: '', duration: '', season: '', countries: '' });
      setCountriesState([]);
    }
     
  };
  //esta funcion se asegura de que ciertos campos del formulario tengan datos válidos antes de permitir que 
 //el formulario se envíe, mostrando alertas en caso de que falten datos o haya errores.
  const antesDelSubmit = (event) => {
    if (
      errors.name !== 'Se requiere el nombre' &&
      errors.name !== '✔' &&
      errors.name !== ''
    ) {
      window.alert('Datos erroneos en nombre');
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
      // errors.season !== 'Se requiere una temporada' &&
      // errors.season !== '✔' &&
      // errors.season !== ''
      errors.season === 'Se requiere una temporada'
    ) { 
      window.alert('Te falta seleccionar una temporada');
    } else if (
      // errors.countries !== 'Se requieren paises' &&
      // errors.countries !== '✔' &&
      // errors.countries !== ''
      errors.countries === 'Se requieren paises'
          ) {
      window.alert('Te falta seleccionar al menos un pais');
    } 
    else handleSubmit(event)
  }

  const allCountries = useSelector((state)=>state.allCountries)//guardo el estado global de paises en esta variable
  const mapeo = allCountries?.map(({id, name}) => ({id, name}))//aplico la función `map` para crear un nuevo array (`mapeo`) donde cada elemento tiene solo las propiedades `id` y `name` de los objetos originales de `allCountries`.
  const list = mapeo.sort((a,b)=>a.name.localeCompare(b.name))// Ordeno el array `mapeo` alfabéticamente según el nombre de los países. Se utiliza el método `localeCompare` para realizar una comparación sensible a la localización y asegurar un ordenamiento adecuado.
  const seasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']  

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
          {seasons.map((sea)=>(
            <option key={sea} value={sea}>
             {sea}
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
        <button className='boton' type="button" value="submit" onClick={()=>antesDelSubmit(event)}>Submit</button>
    </form>
  )
}
export default Form;