import { 
 GET_ALL_RECIPES,
 GET_ALL_DIETS,
 GET_RECIPE_ID,
 GET_RECIPE_NAME,
 SWITCH_LOADING,
 CREATE_RECIPE } from '../actions/actionsType';

const initialState = {
    recipe : [],
    allRecipes : [],
    details : {},
    diet : [],
    loading : true
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_RECIPES : 
        return {
            ...state,
            allRecipes : payload,
            recipe : payload
        }

        case GET_ALL_DIETS : 
        return {
            ...state,
            diet : payload
        }
    
        case GET_RECIPE_ID : 
        return {
            ...state,
            details : payload
        }
        case GET_RECIPE_NAME : 
        return {
            ...state,
            recipe : payload
        }
        case SWITCH_LOADING:
        return {
            ...state,
            loading: payload
        }
        case CREATE_RECIPE : 
        return {
            ...state
        }
        default :
        return state
    }
}

export default reducer;
