const router = require("express").Router();
const { Recipe, Diet } = require('../db');



router.post('/', async (req, res, next) => {
    const { title, image, summary, healthScore, analyzedInstructions, diet } = req.body;
    if(!title || !summary){
        res.status(400).json('Data missing')
    }else{
        try {
            console.log(diet)
        const createDb = await Recipe.create({
            title : title,
            image : image,
            summary : summary, 
            healthScore : healthScore, 
            analyzedInstructions : analyzedInstructions
        })
        if(diet){
            diet.forEach(async (nameDb) => {
                let data = await Diet.findAll({
                    where : {
                        name : nameDb,
                    }
                })
                console.log(data)
                await createDb.addDiets(data)
            });
        }
       
        res.send(createDb)
        } catch (error) {
            next(error)
        }
    }
})
module.exports = router;