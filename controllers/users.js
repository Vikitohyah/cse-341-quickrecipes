const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        // #swagger.tags=['Users']
        // Unified database access method
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid user ID" });
            return;
        }

        const userId = new ObjectId(req.params.id);
        // #swagger.tags=['Users']
        // Unified database access method
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

        if (!user) {
            res.status(404).json({ message: "No user found with the given ID" });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const createUsers = async (req, res) => {
    try {
        // #swagger.tags=['Users']
        const user = {
            name: req.body.name,
            email: req.body.email,
            oauthId: req.body.oauthId,
        };

        // Unified database access method
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        // Changed to 201 Created for resource creation, consistent with recipes.js
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: "Some error occurred while creating user" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        // #swagger.tags=['Users']
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid user ID" });
            return;
        }
        const userId = new ObjectId(req.params.id);
        const user = {
            name: req.body.name,
            email: req.body.email,
            oauthId: req.body.oauthId,
        };
        // Unified database access method
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // #swagger.tags=['Users']
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid user ID" });
            return;
        }
        const userId = new ObjectId(req.params.id);
        // Unified database access method
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUsers,
    updateUser,
    deleteUser
}