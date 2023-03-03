const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, isValidMinion, addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId,} = require("./db");
const meetings = require("../browser/store/meetings");


////////////////////////MINION API///////////////////

apiRouter.param('minionId',(req, res, next,id)=>{
    const minion = getFromDatabaseById('minions',id);
    if(minion){
        req.minion =minion;
        next();
    }else{
        res.status(404).send();
    }
})
apiRouter.get('/minions',(req, res ,next)=>{
    res.send(getAllFromDatabase('minions'));
});

apiRouter.get('/minions/:minionId',(req, res , next)=>{
    res.send(req.minion);
});

apiRouter.post('/minions',(req, res , next)=>{
    const newMinion = addToDatabase('minions',req.body);
    console.log(req.body);
    res.status(201).send(newMinion);
});

apiRouter.put('/minions/:minionId',(req, res ,next)=>{
    console.log(req.minion);
    const change = Object.keys(req.query);
    console.log(change);
    for (let i =0; i< change.length;i++){
       if(change[i] === 'name'){
           req.minion.name = req.query.name;
       }
       if(change[i]==='title'){
           req.minion.title = req.query.title;
       }
       if(change[i]==='weaknesses'){
           req.minion.weaknesses = req.query.weaknesses;
       }
       if(change[i]==='salary'){
           req.minion.salary = req.query.salary;
       }
    }
    const updatedMinion = updateInstanceInDatabase('minions',req.minion);
    res.send(updatedMinion);
});

apiRouter.delete('/minions/:minionId',(req, res, next)=>{
    const deletedMinion = deleteFromDatabasebyId('minions',req.params.minionId);
    if(deletedMinion){
        res.send("Delete Succes");
    }else{
        res.status(404).send();
    }
    res.send();
});

///////////////////////IDEAS API///////////////////////////////////////////

apiRouter.param('ideaId',(req, res, next, id)=>{
    const idea = getFromDatabaseById('ideas',id);
    if (idea){
        req.idea = idea;
        next();
    }else{
        res.status(404).send();
    }
})
apiRouter.get('/ideas',(req, res ,next)=>{
        res.send(getAllFromDatabase('ideas'));
    }
);

apiRouter.get('/ideas/:ideaId',(req, res , next)=>{
    res.send(req.idea);
});

apiRouter.post('/ideas',(req, res , next)=>{
    const newIdea = addToDatabase('ideas',req.body);
    res.status(201).send(newIdea);
});

apiRouter.put('/ideas/:ideaId',(req, res ,next)=>{
    const change = Object.keys(req.query);
    for(let i =0; i< change.length; i++ ){
        if(change[i] === 'name'){
            req.idea.name = req.query.name;
        }
        if(change[i]==='description'){
            req.idea.description = req.query.description;
        }
        if(change[i]==='weeklyRevenue'){
            req.idea.weeklyRevenue = req.query.weeklyRevenue;
        }
        if(change[i]==='numWeeks'){
            req.idea.numWeeks = req.query.numWeeks;
        }
    }
    const updatedIdea = updateInstanceInDatabase('ideas',req.idea)
    res.send(updatedIdea);
});

apiRouter.delete('/ideas/:ideaId',(req, res, next)=>{
    const deletedIdea = deleteFromDatabasebyId('ideas',req.params.ideaId);
    if(deletedIdea){
        res.send("Delete Succes");
    }else{
        res.status(404).send();
    }
    res.send();

});




///////////////////////MEETING API/////////////////////////////////////////
apiRouter.get('/meetings', (req, res , next)=>{
    res.send(getAllFromDatabase('meetings'));
});

apiRouter.post('/meeting',(req, res, next)=>{
   const newMeetings = addToDatabase('meeting',req.body);
   res.status(201).send(newMeetings);
});

apiRouter.delete('/meetings',(req, res , next)=>{
    res.send('Delete All!!!');
});








module.exports = apiRouter;
