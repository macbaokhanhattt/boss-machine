const express = require('express');
const apiRouter = express.Router();
const {getAllFromDatabase, getFromDatabaseById, isValidMinion,} = require("./db");


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
   res.send('sss');
});

apiRouter.put('/minions/:minionId',(req, res ,next)=>{
    res.send('test');
});

apiRouter.delete('/minions/:minionId',(req, res, next)=>{
    res.send('test');
});

///////////////////////IDEAS API///////////////////////////////////////////
apiRouter.get('/ideas',(req, res ,next)=>{
        res.send(getAllFromDatabase('ideas'));
    }
);

apiRouter.get('/ideas/:ideaId',(req, res , next)=>{
    res.send('dr');
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
