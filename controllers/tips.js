const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tips').find();
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
            res.status(400).json({ message: "Must use a valid tip ID" });
            return;
        }

        const tipId = new ObjectId(req.params.id);
        const tip = await mongodb.getDatabase().db().collection('tips').findOne({_id: tipId });
        
        if (!tip) {
            res.status(404).json({ message: "No tip found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tip);
        
    } catch (err) {
        res.status(500).json({ message: err.message });   
    }
        
}

const createTip = async (req, res) => {
    try {
        //swagger.tags=['tips']
        const tip = {
            title: req.body.title,
            content: req.body.content
        };
    
        const response = await mongodb.getDatabase().db().collection('tips').insertOne(tip);
        if (response.acknowledged) {
            res.status(204).send();
        }else {
            res.status(500).json({ message: "Some error occurred while creating tip" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getAll,
    getSingle,
    createTip,
}