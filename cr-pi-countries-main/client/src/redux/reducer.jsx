import{ ADD_COUNTRY, REMOVE_COUNTRY, FILTER_CONTINENT, ADD_COUNTRY_NAME, FILTER_ACTIVITY, ADD_ACTIVITY, ORDER_ABC, ORDER_POBLATION} from './actions-types';

const initialState = {//estado global
    allCountries: [],
    countryByName: [],
    allActivities: [],
    filterActivity:'Filter by activity' ,
    filtroConti: 'Filter by Continent',
    orderABC:'',
    orderPoblation:'',
}


const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ADD_COUNTRY:
           return {
             ...state,
             allCountries: [...payload]
           };
        case ADD_COUNTRY_NAME:
            //console.log([...state.countryByName, payload]);
            return{
                ...state,
                countryByName: [...state.countryByName, payload]
               
            };
        case ADD_ACTIVITY:
                return {
                  ...state,
                  allActivities: [...payload]
                };
        case REMOVE_COUNTRY:
            return{
                ...state,
                countryByName: state.countryByName.map((coun)=> coun.filter((country) => country.id !== payload)),   
            };
        case FILTER_CONTINENT:
            state.filtroConti = payload;
            return{
                ...state
            }; 
        case FILTER_ACTIVITY:
            state.filterActivity = payload;
            return{
                ...state
            };
        case ORDER_ABC:
            state.orderABC = payload;
            return{
                ...state,
            } 
        case ORDER_POBLATION:
                state.orderPoblation = payload;
                return{
                    ...state,
                } 

        default:
            return { ...state }  

    }
}
export default reducer;