import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterActivity, filterConti, orderABC, orderPoblation } from '../../redux/actions';

const Navbar = ({countries, countriesByName, activities}) => {

  const location = useLocation()
  const dispatch = useDispatch();

 useEffect(()=>activities(),[]);
 useEffect(()=>countries(),[]);//ejecuta el codigo interno cuando se levanta el componente

 const [name, setName]=useState('');//estado local
 const [aux, setAux]=useState('');//estado local

 const allCountries = useSelector((state)=>state.allCountries);//estado global de toodos los paises
 const allActivities = useSelector((state)=>state.allActivities);
 const countryByName = useSelector((state)=>state.countryByName)
 const [selectFilter, setSelectFilter]= useState();
 const [selectFilterAct, setSelectActivity] = useState();
 const [selectOrderABC, setSelectOrderABC] = useState();
 const [selectOrderPoblation, setSelectOrderPoblation] = useState();

 const selectContinent = () =>{//esta funcion se encarga de darle valores a las option del select
   let casoBase = ['Filter by Continent']//titulo de las opciones
   let mapeo = allCountries?.map((country)=>country.continent)//saca continentes del estado global
   let conjunto = new Set(mapeo)//saca los continetes repetido en un objeto
   let array = Array.from(conjunto)//vuelve arreglo el objeto
   return casoBase.concat(array)//retorna el caso base concatenado con el nuevo arreglo
  };

 const selectActivity = () => {
   let casoBase = ['Filter by activity']
   let map = allActivities?.map((activ)=>activ.name)
   return casoBase.concat(map)
  };

 const handlerFilterContin = (event) => {
   setSelectActivity('Filter by activity')
   dispatch(filterActivity('Filter by activity'))
   dispatch(filterConti(event.target.value))//manda una accion 
   setSelectFilter(event.target.value)
  };

 const handleFilterActiv = (event) =>{
   setSelectFilter('Filter by Continent')
   dispatch(filterConti('Filter by Continent'))
   dispatch(filterActivity(event.target.value))
  };

 const handleChange = (event) =>{
    setAux(event.target.value)
    setName(event.target.value)
  };

 const handleOrderABC = (event) => {
  setSelectOrderPoblation('')
  dispatch(orderPoblation(''))
  dispatch(orderABC(event.target.value))
  };

 const handleOrderPoblation = (event) => {
   setSelectOrderABC('')
   dispatch(orderABC(''))
   dispatch(orderPoblation(event.target.value))
  };

 const searchCountryName = (name) =>{
  let countries = countryByName?.flatMap((coun)=> coun)
  let mapeo = countries?.map((count)=> count.name?.toUpperCase())
  let auxMayus = aux.toUpperCase()
  if (!mapeo.includes(auxMayus)) {
    setAux('');
    setName('');
    return countriesByName(name);
  } else window.alert("Ya existe este país en la lista");
  };

 const seteo = () =>{
   setSelectFilter('Filter by Continent')
   setSelectActivity('Filter by activity')
   setSelectOrderABC('')
   setSelectOrderPoblation('')
   dispatch(filterConti('Filter by Continent'))
   dispatch(filterActivity('Filter by activity'))
   dispatch(orderABC(''))
   dispatch(orderPoblation(''))
  };

  const display = 'none';
  return (

    <div className={location.pathname === '/form' ? display:''}>
        <NavLink to='/home'>
        <button className='Home' onClick={()=>seteo()}>Home</button>
        </NavLink>
        <NavLink to='/form'>
        <button className='create' >Create Activity</button>
        </NavLink>

        <input className='input' type='search' onChange={handleChange} value={aux}/>
        <NavLink to='/home/name'>
        <button className='Search' onClick={()=>searchCountryName(name)} >Search Countries</button>
        </NavLink>
        
        <select className='select' value={selectFilter} onChange={handlerFilterContin}>
          {selectContinent()?.map((option)=>(
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <select className='select2' value={selectFilterAct} onChange={handleFilterActiv}>
          {selectActivity()?.map((all)=>(
            <option key={all} value={all}>{all}</option>
          ))}
        </select>

        <select className='abc' value={selectOrderABC} onChange={handleOrderABC}>
          <option value="">Alphabetically</option>
          <option value="A">A ⬇ Z</option>
          <option value="D">Z ⬆ A</option>
        </select>

        <select className='poblat' value={selectOrderPoblation} onChange={handleOrderPoblation}>
          <option value="">by population</option>
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descendente</option>
        </select>
        
    </div>
  )
}

export default Navbar;
