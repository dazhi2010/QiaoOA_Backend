var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/QiaoOADB";
var dbName = "QiaoOADB";
var thisService = this;
function BaseService (modelName){
    thisService.model = modelName;
}
function connect(callback){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db(dbName);
        callback(db,dbase);
    });
}
//create
BaseService.prototype.insert = function (doc,callback){
    connect(function (db,dbase) {
        dbase.collection(thisService.model).insertOne(doc,function(err, result) { // 返回集合中所有数据
            db.close();
            if (err) throw err;
            return callback(result.ops);
        });
    });
};

BaseService.prototype.count = function (query, callback) {
    connect(function (db,dbase) {
        dbase.collection(thisService.model).count(query).toArray(function(err, result) { // 返回集合中所有数据
                db.close();
                if (err) throw err;
                return callback(result);
            });
    });
};

BaseService.prototype.query = function (query,callback) {
    connect(function (db,dbase) {
        dbase.collection(thisService.model).find(query).toArray(function(err, result) { // 返回集合中所有数据
            db.close();
            if (err) throw err;
            return callback(result);
        });
    });
};

// BaseService.prototype.delete = function (query, callback){
//     thisService.model.remove(query, function(error){
//         if(error) return callback(error);
//
//         return callback(null);
//     });
// };
//
//
// BaseService.prototype.update = function( conditions, update ,options, callback) {
//     thisService.model.update(conditions, update, options, function (error) {
//         if(error) return callback(error);
//         return callback(null);
//     });
// };

module.exports = BaseService;