const mongodb = require('../db/connect'); // Assuming this is the correct database connection module
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        // #swagger.tags=['Recipes']
        const result = await mongodb.getDb().db().collection('recipes').find();
        const recipes = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid recipe ID" });
            return;
        }

        const recipeId = new ObjectId(req.params.id);
        // #swagger.tags=['Recipes']
        const recipe = await mongodb.getDb().db().collection('recipes').findOne({ _id: recipeId });

        if (!recipe) {
            res.status(404).json({ message: "No recipe found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recipe);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const createRecipes = async (req, res) => {
    try {
        // #swagger.tags=['Recipes']
        const recipe = {
            // Updated to new schema consistent with middleware/validate.js
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            category: req.body.category,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings
        };

        const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
        if (response.acknowledged) {
            res.status(201).json(response); // 201 Created, return the inserted ID
        } else {
            res.status(500).json({ message: "Some error occurred while creating recipe" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const updateRecipe = async (req, res) => {
    //#swagger.tags=['Recipes']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid recipe ID to update a recipe.' });
    }
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings
    };
    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('recipes')
            .replaceOne({ _id: recipeId }, recipe);
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Recipe not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error occurred while updating the recipe.' });
    }
};
const deleteRecipe = async (req, res) => {
    //#swagger.tags=['Recipes']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid recipe ID to delete a recipe.' });
    }
    const recipeId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: recipeId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error occurred while deleting the recipe.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createRecipes,
    updateRecipe,
    deleteRecipe
};