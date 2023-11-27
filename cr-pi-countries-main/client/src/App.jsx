import {LandingPage, Cards, Detail, Form, Navbar, CardsByName} from './components/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, addCountryByName, removeCountry , addActivity} from './redux/actions';
import axios from 'axios';


function App() {
   const location = useLocation()
   const dispatch = useDispatch()
   const countryByName = useSelector((state)=>state.countryByName)
  

   const countries = ()=>{
     dispatch(addCountry())
    };

    const countriesByName = (name) =>{
      dispatch(addCountryByName(name))
    };
    const activities = () => {
      dispatch(addActivity())
    };

    const onClose = (id)=>{
      dispatch(removeCountry(id))

    };
   
   const postActivity = async({name, difficulty, duration, season, countries}) =>{
     try {
       const info = {name, difficulty, duration, season, countries}
        let {data} = await axios.post('http://localhost:3001/activities',info)
       window.alert(data);
       }  catch (error) {
      window.alert(error.response.data)
      }
    }

  return (
      <div className='app'>
       {location.pathname !== '/' && <Navbar countries={countries} 
       countriesByName={countriesByName} activities={activities}/>} 
       
        <Routes>    
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path="/detail/:id" element={<Detail />}/>
          <Route path='/home' element={<Cards />}/>
          <Route path='/home/name' element={<CardsByName onClose={onClose} />}/>
          <Route path='/form' element={<Form countries={countries} activities={activities} postActivity={postActivity}/>}/>
      </Routes>
      </div>
  )
}

export default App;
