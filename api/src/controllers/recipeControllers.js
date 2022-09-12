const router = require("express").Router();
const axios = require("axios");
const { api_key } = process.env
const { Recipe, Diet } = require('../db');


async function getAllRecipesApi(){
    const recipeApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`)

    const recipeMap = recipeApi.data.results.map(r => {
        return {
            id : r.id,
            title : r.title,
            summary : r.summary ,
            image : r.image,
            healthScore : r.healthScore,
            diet : r.diets,
            analyzedInstructions : r.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })

    return recipeMap
}
async function getAllRecipesDb(){
    const recipeDb = await Recipe.findAll({
    include :{
    model : Diet,
    attributes : ['name'],
    through : {
        attributes : []
    }
    }
    })
    return recipeDb
}
async function unify(){
    const getApi = await getAllRecipesApi()
    const getDb = await getAllRecipesDb()
    const unifying = getApi.concat(getDb)

    return unifying
}
router.get('/', async (req, res, next) => {
    const {name} = req.query
    try {
        let allRecipes = await unify()
        if(name){
            let recipeName = allRecipes.filter(el=> el.title.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ? res.status(200).json(recipeName) : res.status(500).json('No se encontraron resultados')
        }else{
            res.status(200).json(allRecipes)
        }
    } catch (error) {
        next(error)
    }
})
function isUUID(id){
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
}
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await getAllRecipesDb();
        console.log(data)
        if(isUUID(id)){
            // const dataDb =  await Recipe.findByPk(id, {
            //     includes : {
            //         model : Diet,
            //         attributes : ['name'],
            //         through : {
            //             attributes : [] 
            //         }
            //     }
            // })
            const dataFinal = await data.map(e => {
                return {
                    id : e.id,
                    title : e.title,
                    image : e.image,
                    diet : e.diets.map(e => e.name),
                    summary : e.summary,
                    healthScore : e.healthScore,
                    analyzedInstructions : e.analyzedInstructions
                }
            })
            console.log(dataFinal)

            return res.json(dataFinal)
        }else{
        const dataApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`)
        let dataApiById =  {
                id : e.id,
                title : e.title,
                image : e.image,
                dishTypes : e.dishTypes,
                diet : e.diets,
                summary : e.summary,
                healthScore : e.healthScore,
                analyzedInstructions : e.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                    }
                })
            }
        
            return res.json(dataApiById)
        }
    }
    catch (error) {
       next(error)
    }
})

module.exports = router;