const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('tips').find();
        const tips = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tips);
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
        const tip = await mongodb.getDatabase().db().collection('tips').findOne({ _id: tipId });

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
        if (response.acknowledged > 0) {
            res.status(201).json(response.insertedId);
        } else {
            res.status(500).json({ message: "Some error occurred while creating tip" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Logic to modify an existing tip by its unique MongoDB ID
const updateTip = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid tip ID" });
            return;
        }
        const tipId = new ObjectId(req.params.id);
        const tip = {
            title: req.body.title,
            content: req.body.content
        };
        const response = await mongodb.getDatabase().db().collection('tips').replaceOne({ _id: tipId }, tip);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: "Some error occurred while updating the tip" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Logic to delete a specific tip record
const deleteTip = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: "Must use a valid tip ID" });
            return;
        }
        const tipId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('tips').deleteOne({ _id: tipId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Consider returning 404 if no document was found with the ID.
            // For now, keeping consistent with other delete functions.
            res.status(500).json({ message: "Some error occurred while deleting the tip" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getAll,
    getSingle,
    createTip,
    updateTip,
    deleteTip
}