const router = require("express").Router();
const { Diet } = require('../db');



const diets = [
{name : 'Gluten Free'}, {name : 'Ketogenic'}, {name : 'Vegetarian'}, {name : 'Lacto-Vegetarian'}, 
{name : 'Ovo-Vegetarian'}, {name : 'Vegan'}, {name : 'Pescetarian'}, {name : 'Paleo'},
{name : 'Primal'}, {name : 'Low FODMAP'}, {name : 'Whole30'}]

router.get('/', async (req, res, next) => {
    try {
        const dietDb = await Diet.findAll({
            attributes : ['name']
        })
        if(dietDb.length > 0){
            return res.json(dietDb)
        }else{
            Diet.bulkCreate(diets)
            const dietDb2 = await Diet.findAll({
                attributes : ['name']
            })
            return res.json(dietDb2)
        }        
    } catch (error) {
        next(error)
    }
})

module.exports = router;