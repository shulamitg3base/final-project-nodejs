var express = require('express');
var emailRouter = express.Router();
var mongoDB = require('./mongoDB');

emailRouter.use('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


emailRouter.get('/:emailAddress/:categoryToShow', (req, res) => {
    let getEmailsQuery;
    let getNumOfUnreadEmailsQuery;
    let result = { numOfUnreadEmails: "", emailsList: [] };
    if (req.params.categoryToShow === "INBOX") {
        getEmailsQuery = { receiver: req.params.emailAddress }
    }
    if (req.params.categoryToShow === "SENT") {
        getEmailsQuery = { sender: req.params.emailAddress }
    }
    getNumOfUnreadEmailsQuery = { receiver: req.params.emailAddress, isRead: false }
    mongoDB.getNumOfUnreadEmails(getNumOfUnreadEmailsQuery).then(data => result.numOfUnreadEmails = data);
    mongoDB.getEmails(getEmailsQuery)
        .then(data => {
            data.forEach(i => {
                i.senderName = `${i.senderData.firstName} ${i.senderData.lastName}`;
                i.receiverName = `${i.receiverData.firstName} ${i.receiverData.lastName}`;
                delete i['senderData'];
                delete i['receiverData'];
            });
            result.emailsList = data;
            res.send(result);
        })
        .catch(err => res.send({ error: err }));
});


emailRouter.post('/newEmail', (req, res) => {
    mongoDB.addNewEmail(req.body.newEmail)
    res.send();
});


emailRouter.delete('/deleteEmail', (req, res) => {
    mongoDB.deleteEmail(req.body.emailId)
    res.send();
})

emailRouter.put('/updateIsReadEmail',(req,res) =>{
   mongoDB.updateIsReadEmail(req.body.emailId, req.body.isRead)
   res.send();
})

module.exports = emailRouter;