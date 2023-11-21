import './card.css'

import { NavLink, useLocation } from "react-router-dom";


const Card = (props) => {
    const location = useLocation()

    return (
        <div className="contain">
            {location.pathname !== '/home'? <button className='cerrar' onClick={()=>props.onClose(props.id)}>❌</button>:'' }
        <div className='name'><h1>{props.name}</h1></div> 
         <div className='continent'><h1>{props.continent}</h1></div>
         
         
         <NavLink to={`/detail/${props.id}`}>
         <img className='imgCar' src={props.flag_image} alt="Not found" />
         </NavLink>
        </div>
    )
  }
  export default Card;
  