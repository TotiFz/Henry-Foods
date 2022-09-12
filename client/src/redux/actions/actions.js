import { 
    GET_ALL_RECIPES,
    GET_ALL_DIETS,
    GET_RECIPE_ID,
    GET_RECIPE_NAME,
    SWITCH_LOADING,
    CREATE_RECIPE
} from '../actions/actionsType';
import axios from 'axios';

export function getAllRecipes () {
    return async function (dispatch) {
        const getData = await axios.get('http://localhost:3001/recipe')
        dispatch({
            type : GET_ALL_RECIPES,
            payload : getData.data
        })
    }
}
export function getAllDiets () {
    return async function (dispatch) {
        const getData = await axios.get('http://localhost:3001/diet')
        dispatch({
            type : GET_ALL_DIETS,
            payload : getData.data
        })
    }
}
export function getRecipesById (id) {
    return async function (dispatch) {
        try {
            const getData = await axios.get(`http://localhost:3001/recipe/${id}`)
            dispatch({
                type : GET_RECIPE_ID,
                payload : getData.data
            })
        }
            
    catch (error) {
        console.log(error);
    }
}
}
export function getRecipesByName (name) {
    return async function (dispatch) {
        const getData = await axios.get(`http://localhost:3001/recipe?name=${name}`)
        dispatch({
            type : GET_RECIPE_NAME,
            payload : getData.data
        })
    }
}
export function switchLoading(bool) {
    return (dispatch) => {
        dispatch({ type: SWITCH_LOADING, payload: bool })
    }
}
export function createRecipe(data) {
    return async function(dispatch){
        try {
            const getData = await axios.post('http://localhost:3001/create', data);
            dispatch({
                type: CREATE_RECIPE,
                payload: getData.data
            })
            // return getData
        } catch (error) {
            console.log(error)
        }
    }
}
