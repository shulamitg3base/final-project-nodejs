var DbConnection = require("./classes/dbConnection");
var ObjectId = require("mongodb").ObjectID;

let dbConnection = DbConnection();
const getEmails = query => {
  return new Promise((resolve, reject) => {
    dbConnection.connectToDataBase.then(db => {
      db.collection("emails").aggregate([
        {
          $match: query
        },
        {
          $lookup:
          {
            from: 'users',
            localField: 'sender',
            foreignField: 'emailAddress',
            as: 'senderData'
          }
        },
        { $unwind: '$senderData' },
        {
          $lookup:
          {
            from: 'users',
            localField: 'receiver',
            foreignField: 'emailAddress',
            as: 'receiverData'
          }
        },
        { $unwind: '$receiverData' },
        {
          $sort: {
            "sendingTime": 1
          }
        }
      ]).toArray((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          resolve(result);
          //dbConnection.disConnectToDataBase();
        }

      })
    })
  })
}

const getNumOfUnreadEmails = query => {
  return new Promise((resolve) => {
    dbConnection.connectToDataBase.then(db => {
      resolve(db.collection("emails").countDocuments(query)
      )
    })
  })
}

const addNewEmail = newEmail => {
  dbConnection.connectToDataBase.then(db => {
    db.collection("emails").insertOne(newEmail)
  })
}

const deleteEmail = emailId => {
  dbConnection.connectToDataBase.then(db =>
    db.collection("emails").deleteOne({ _id: ObjectId(emailId) })
  )
}

const updateIsReadEmail = (emailId, isRead) => {
  dbConnection.connectToDataBase.then(db => {
    db.collection('emails').updateOne({ _id: ObjectId(emailId) }, {$set: {isRead: isRead}});
  })
}


module.exports = {
  getEmails: getEmails,
  getNumOfUnreadEmails: getNumOfUnreadEmails,
  addNewEmail: addNewEmail,
  deleteEmail: deleteEmail,
  updateIsReadEmail: updateIsReadEmail
}
