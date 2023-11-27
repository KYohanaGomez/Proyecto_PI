import { useState } from "react";

const validation = (newActivity) =>{
  
    let newErrors = {};
    const regex = /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    const regex1 = /^(?!.*([a-zA-Z])\1)[a-zA-Z\s]+$/;
    const regex2 = /^[A-Z][a-zA-Z\s]*$/;
    const regex3 = /^[^a-zA-Z]+$/;
    const regex4 = /\b(\w+)\b(?=.*\b\1\b)/gi;
  
    if (newActivity.name) {
      if (!regex.test(newActivity.name)) newErrors.name = 'No debe contener símbolos ni números';
      else if (!regex1.test(newActivity.name)) newErrors.name = 'Debe ser una palabra o frase válida';
      else if (!regex2.test(newActivity.name)) newErrors.name = 'La primer letra debe ser mayuscula';
      else if (newActivity.name.length < 5) newErrors.name = 'Minimmo 5 caracteres';
      else if (newActivity.name.length > 40) newErrors.name = 'Maximo 40 caracteres';
      else if (regex4.test(newActivity.name)) newErrors.name = 'Palabra repetida';
      else newErrors.name = '✔';
    } else newErrors.name = 'Se requiere el nombre'


    let difficultad = parseInt(newActivity.difficulty)
    if (newActivity.difficulty) {
      if (difficultad < 1 || difficultad > 5) newErrors.difficulty = 'El nivel de dificultad debe ser entre 1 y 5';
      else if (!regex3.test(newActivity.difficulty)) newErrors.difficulty = 'No debe contener letras';
      else newErrors.difficulty = '✔';
    } else newErrors.difficulty = 'Se requiere un nivel de dificultad';
      
    let duracion = parseInt(newActivity.duration)
    if (newActivity.duration) {
      if (duracion < 10 || duracion > 50) newErrors.duration = 'La duracion debe ser entre 10 y 50 horas';
      else if (!regex3.test(newActivity.duration)) newErrors.duration = 'No debe contener letras';
      else newErrors.duration = '✔';
    } else newErrors.duration = 'Se requiere un tiempo de duracion';
    
    if(!newActivity.season) newErrors.season = 'Se requiere una temporada'
    else newErrors.season ='✔';

    
    // if (newActivity.countries.length === 0) newErrors.countries = 'Se requieren paises';
    //  else newErrors.countries = '✔';

    return newErrors;

}

export default validation;