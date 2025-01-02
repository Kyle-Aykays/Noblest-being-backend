const Mood = require('../Models/Mood'); 


const createMood = async (req,res) => {
    try{
        const {userId, date, mood, reason, context} = req.body

        if (!userId || !mood){
            return res.status(400).json({
                message: "Missing userID or mood field "
            })}

        const moodDate = new Date(date || new Date());
        moodDate.setHours(0,0,0,0);

        let moodlog = await Mood.findOne({user: userId, date: moodDate}); 

        if(!moodlog){
          
                moodLog = new Mood ({
                    user: userId,
                    date: moodDate, 
                    moods: [],
               
            });}

            moodlog.moods.push({mood, reason, context});

            await moodlog.save(); 

            res.status(201).json({
                message: 'Mood entry created successfully', 
                success: true, 
                date: moodlog, 
            })
    }
    catch(err){
        console.log("Error creating mood entry")
        res.status(500).json({
            message: "Error creating the mood" + err,
            success: false, 
        })
    }
}


module.exports = {
 createMood
}; 