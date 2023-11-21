const validation = (newActivity) =>{
 
    let newErrors = {};
   

    if (!newActivity.name) {
        newErrors.name = 'Se requiere el nombre'
        
      } else {
        newErrors.name = 'bien';
    }
    if(isNaN(newActivity.difficulty) || newActivity.difficulty < 1 || newActivity.difficulty > 5 || !newActivity.difficulty){
        newErrors.difficulty = 'La dificultad debe ser un número entre 0 y 5';
        
       }else{
        newErrors.difficulty = 'bien';
    } 
    if (isNaN(newActivity.duration) || newActivity.duration < 0 || !newActivity.duration) {
        newErrors.duration ='La duración debe ser un número positivo'
        
    }else{
        newErrors.duration = 'bien';
    }
    if(!newActivity.season || newActivity.season === ' '){
        newErrors.season = 'Se requiere una temporada'
        
      }else{
        newErrors.season ='bien';
    }
    if(newActivity.countries.length === 0){
        newErrors.countries ='Se requieren paises'
        
      }else{
        newErrors.countries = 'bien';
    } 

    return newErrors;

}

export default validation;