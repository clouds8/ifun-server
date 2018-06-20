const mongo = require('../lib/db')
const ObjectID = require('mongodb').ObjectID;
const defaultDB = require('../config.json').mongo.database
const LIMIT = 10;

class Mongo {

    constructor(table, dbName = defaultDB) {
        this.TABLE = table;
        this.client = mongo();
        this.dbName = dbName;
    }

    load() {
        return this.client.then((client) => {
            let db = client.db(this.dbName);
            return db.collection(this.TABLE);
        });
    }

    findOne(param, projection) {
        return this.load().then((db) => {
            return db.find(param, projection).limit(1).next();
        });
    }

    find(param) {
        return this.load().then((db) => {
            return db.find(param).limit(LIMIT).toArray();
        });
    }

    findAll(param, projection) {
        return this.load().then((db) => {
            return db.find(param, projection).toArray();
        });
    }

    insertOne(doc, options) {
        return this.load().then((db) => {
            return db.insertOne(doc, options);
        })
    }

    insertMany(docs, options) {
        return this.load().then((db) => {
            return db.insertMany(docs, options);
        })
    }

    updateOne(filter, update, options) {
        return this.load().then((db) => {
            return db.updateOne(filter, update, options);
        })
    }

    updateMany(filter, update, options) {
        return this.load().then((db) => {
            return db.updateMany(filter, update, options);
        })
    }

    deleteOne(filter, options) {
        return this.load().then((db) => {
            return db.deleteOne(filter, options);
        })
    }

    deleteMany(filter, options) {
        return this.load().then((db) => {
            return db.deleteMany(filter, options);
        })
    }

    findOneAndUpdate(filter, update, options) {
        return this.load().then((db) => {
            return db.findOneAndUpdate(filter, update, options);
        })
    }

    sum(query, options) {
        return this.load().then((db) => {
            return db.count(query, options);
        });
    }

    aggregate(param) {
        return this.load().then((db) => {
            return db.aggregate(param).toArray();
        });
    }

    toObjectID(id) {
        return new ObjectID(id);
    }

}
module.exports = Mongo;