import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../card/card'


const CardsByName = ({onClose}) => {

    const countryByName = useSelector((state)=>state.countryByName)//estado global 
    const allCountries = useSelector((state)=>state.allCountries);
    const filtroConti = useSelector((state)=>state.filtroConti)
    const filterActivity = useSelector((state)=>state.filterActivity)
    const orderABC = useSelector((state)=>state.orderABC)
    const orderPoblation = useSelector((state)=>state.orderPoblation)
  
   
    let countrie = [...allCountries]//creo una variable y le hago una copia al estado global de todos los paises
    let countriesName = [...countryByName]
    let countries = countriesName.flatMap((coun)=> coun)
    // let orderAB = [...orderABC]
    // let orderPoblat = [...orderPoblation]

    
    if(filtroConti !== 'Filter by Continent') {
      countries = [...countries]?.filter((coun)=>coun.continent === filtroConti)
    };
    
    if (filterActivity !== 'Filter by activity') {
      countries = [...countries]?.filter((coun)=> {
        let activities = coun.Activities?.flatMap((act)=> act.name)
        return activities?.includes(filterActivity)
      }) 
    };
    
    if(orderABC !== '') {
       orderABC === 'A' ? countries.sort((a, b) => a.name.localeCompare(b.name))
                     : countries.sort((a, b) => b.name.localeCompare(a.name))
    };

  if(orderPoblation !== '') {
     orderPoblation ==='Asc'? countries.sort((a, b)=>a.population-b.population)
                            : countries.sort((a, b)=>b.population-a.population)                      
  };
      const [actualPage, setActualPage] = useState(1);//estado local
      const byPage = 10;//numero de cards que muestra por pagina
      const start = (actualPage -1) * byPage;//se calcula el indice de inicio de las cards que se mostraran en la pagina actual
      const final = start + byPage;//se calcula el indice final de las cards que se mostrara en la pagina actual
      const cardsVisibles = countries?.slice(start, final);//se saca la porcion de cards para mostrar segun el caso filtro u ordenamien
      const maxOfPages = Math.ceil(countries?.length / byPage);//se calcula el numero maximo de paginas para mpstrar las cards

      const handlePreviousPage = () => { // funcion que me setea el estado local en -1 para retroceder en las paginas
          if (actualPage > 1) setActualPage(actualPage - 1);
      };

      const handleNextPage = () => {// funcion que me setea el estado local en +1 para avanzar en las paginas
          if (actualPage < maxOfPages) setActualPage(actualPage + 1);
      };

      const renderPagination = () => { // funcion que renderiza los botones para mostrar cada pagina segun las cards disponibles
        const pages = [];
        for (let i = 1; i <= maxOfPages; i++) {
          pages.push(
              <div className='buttonPage' key={i}>
                  <button  
                   onClick={()=>setActualPage(i)}
                   className={i === actualPage?"page":"pages"}>
                    {i}
                  </button>
              </div> 
          )}
        return pages;
      }
    
    
  return (
    <div>
    {countries?.map((coun)=>(
        <Card
        key={coun.id}
        id={coun.id}
        name={coun.name}
        flag_image={coun.flag_image}
        continent={coun.continent}
        capital={coun.capital}
        subregion={coun.subregion}
        area={coun.area}
        population={coun.population}
        onClose={onClose}
     />

    ))}
    <div>
          <button className='anterior' onClick={()=>handlePreviousPage()} disabled={actualPage === 1}>
                ◀
            </button>
              {renderPagination()}
            <button className='siguiente' onClick={()=>handleNextPage()} disabled={actualPage * byPage >= allCountries?.length}>
                ▶
            </button>
          </div>
     </div>
 )
}

export default CardsByName;