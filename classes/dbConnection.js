var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/finalProject-nodejs";

const DbConnection = () => {
    let db;
    let isConnected;
    return {
        connectToDataBase: new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, result) => {
                if (err) {
                    isConnected = false;
                    console.log(err);
                    reject(err);
                }
                else {
                    db = result;
                    isConnected = true;
                    resolve(db.db('emailsDB'));
                }
            })
        }),
        disConnectToDataBase: () => {
            if (isConnected) {
                db.close()
            }
        }
    }
}


module.exports = DbConnection