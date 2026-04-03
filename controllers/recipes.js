const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('recipes').find();
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
        const recipe = await mongodb.getDatabase().db().collection('recipes').findOne({_id: recipeId });
        
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
        //swagger.tags=['recipes']
        const recipe = {
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            cookingTime: req.body.cookingTime,
            difficulty: req.body.difficulty,
            category: req.body.category,
            userId: req.body.userId
        };
    
        const response = await mongodb.getDatabase().db().collection('recipes').insertOne(recipe);
        if (response.acknowledged) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while creating recipe" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAll,
    getSingle,
    createRecipes
}