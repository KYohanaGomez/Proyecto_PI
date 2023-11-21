import './LandingPage.css'
import { NavLink } from "react-router-dom"




const LandingPage = () => {
  
  return (
    <>
      <div className='landing'>
        <h1 className='texto'>WELCOME</h1>
     
      <NavLink to='/home'>
        <button className='inicio'>START</button>
     </NavLink>
        
      </div>
    
    </>
  )
}

export default LandingPage;