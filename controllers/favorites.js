const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('favorites').find();
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
            res.status(400).json({ message: "Must use a valid favorite ID" });
            return;
        }

        const favoriteId = new ObjectId(req.params.id);
        const favorite = await mongodb.getDatabase().db().collection('favorites').findOne({_id: favoriteId });
        
        if (!favorite) {
            res.status(404).json({ message: "No favorite found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(favorite);
        
    } catch (err) {
        res.status(500).json({ message: err.message });   
    }
        
}

const createFavorites = async (req, res) => {
    try {
        //swagger.tags=['favorites']
        const favorite = {
            userId: req.body.userId,
            recipeId: req.body.recipeId
        };
    
        const response = await mongodb.getDatabase().db().collection('favorites').insertOne(favorite);
        if (response.acknowledged) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while creating favorite" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAll,
    getSingle,
    createFavorites
}