const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, isValidMinion, addToDatabase, updateInstanceInDatabase,
    deleteFromDatabasebyId,} = require("./db");


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
    req.minion.name = req.body.name;
    console.log(req.minion);
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
    res.send('sss');
});

apiRouter.put('/ideas/:ideaId',(req, res ,next)=>{
    res.send('test');
});

apiRouter.delete('/ideas/:ideaId',(req, res, next)=>{
    res.send('test');
});




///////////////////////MEETING API/////////////////////////////////////////
apiRouter.get('/meetings', (req, res , next)=>{
    res.send(getAllFromDatabase('meetings'));
});

apiRouter.post('/meeting',(req, res, next)=>{
   res.send('yes');
});

apiRouter.delete('/meetings',(req, res , next)=>{
    res.send('sss');
});








module.exports = apiRouter;
