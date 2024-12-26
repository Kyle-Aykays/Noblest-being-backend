// Import the Dream model
const Dream = require('../Models/Dream');

// Controller function to create a new Dream document
const createDreamDocument = async (req, res) => {
    try {
        const { userId, dreamEntries } = req.body; // Extract userId and dream entries from the request body

        // Check if a Dream document for the user already exists
        let dreamDocument = await Dream.findOne({ userId });

        if (dreamDocument) {
            // If document exists, add new dream entries to the existing document
            dreamDocument.dreamEntries.push(...dreamEntries);
            await dreamDocument.save();
            return res.status(200).json({
                message: 'Dream entries added to existing document.',
                dreamDocument,
            });
        }

        // If no document exists, create a new one
        const newDreamDocument = new Dream({
            userId,
            dreamEntries,
        });

        await newDreamDocument.save();

        res.status(201).json({
            message: 'New Dream document created.',
            dreamDocument: newDreamDocument,
        });
    } catch (error) {
        console.error('Error creating Dream document:', error);
        res.status(500).json({
            message: 'An error occurred while creating the Dream document.',
            error: error.message,
        });
    }
};

module.exports = {
    createDreamDocument,
};
