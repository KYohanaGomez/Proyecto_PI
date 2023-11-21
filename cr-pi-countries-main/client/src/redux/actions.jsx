import{ ADD_COUNTRY, REMOVE_COUNTRY, FILTER_CONTINENT ,ADD_COUNTRY_NAME, FILTER_ACTIVITY, ADD_ACTIVITY, ORDER_ABC, ORDER_POBLATION} from './actions-types';
import axios from 'axios'


export const addCountry = () => {
    const URL = 'http://localhost:3001/countries';
    return async (dispatch) => {
        try {
            const {data} = await axios.get(URL)
          if(!data.length) throw Error('No hay paises')
            return dispatch({type: ADD_COUNTRY, payload: data});
        } catch (error) {
            alert(error.message)  
        }
    }
};

export const filterConti = (filter) => {
    return  ({type: FILTER_CONTINENT, payload: filter});
};


export const addCountryByName = (name) => {
    const URL = 'http://localhost:3001/countries/name';//hago una peticion a mi servidor esto retorna una promesa
    return async (dispatch) =>{
        try {
            const { data } = await axios(URL +`?name=${name}`)
            return dispatch({type:ADD_COUNTRY_NAME, payload: data});
        } catch (error) {
            alert(error.message) 
        }
    }
};
export const removeCountry = (id) => {
    return(dispatch)=>{
        return dispatch ({type:REMOVE_COUNTRY, payload:id})
    }

};
export const filterActivity = (filter) => {
     return  ({type: FILTER_ACTIVITY, payload: filter}); 
 
 };
 
export const addActivity = () => {
    const URL = 'http://localhost:3001/activities';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(URL)
            return dispatch({type: ADD_ACTIVITY, payload: data});
            
        } catch (error) {
            alert(error.message)  
        }
    }
};
export const orderABC= (order) => {
    return({type:ORDER_ABC, payload: order})
};
export const orderPoblation= (order) => {
    return({type:ORDER_POBLATION, payload: order})
};


