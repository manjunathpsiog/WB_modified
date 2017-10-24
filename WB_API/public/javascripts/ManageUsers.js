var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/WorkBench';

exports.addUser = function (req, res) {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var collection = db.collection("Users");
            var body = req.body;
            collection.insert(body);
            var data = req.body;
            res.send("Saved Successfully");
        }
        else {
            res.send("failure");
        }
    });
};

exports.deleteUserByID = function (req, res) {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var dat = req.body;
            db.collection("Users").remove(
                { UserID: req.body.UserID },
                {
                    FirstName: req.body.FirstName, LastName: req.body.LastName,
                    Email: req.body.Email, Password: req.body.Password, flowChartID: req.body.flowChartID
                }
                ,
                { upsert: true }
            )
            res.send("Deleted Successfully");
        }
        else {
            res.send("failure");
        }
    });
};

exports.updateUserByID = function (req, res) {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var dat = req.body;
            db.collection("Users").update(
                { UserID: req.body.UserID },
                {
                    FirstName: req.body.FirstName, LastName: req.body.LastName,
                    Email: req.body.Email, Password: req.body.Password, flowChartID: req.body.flowChartID
                },
                { upsert: true }
            )
            res.send("Updated Successfully");
        }
        else {
            res.send("failure");
        }
    });
};

exports.getAllUsers = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var collection = db.collection("Users");
            collection.find({}).toArray(function (err, user) {
                // so now, we can return all students to the screen.
                res.status(200).json({ 'Users': user });
            });
        }
        else {
            res.send("failure");
        }
    });
};

exports.getAllUserNames = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var collection = db.collection('Users').find({}, { "UserID": 1, "FirstName": 2, _id: 0 })
                .toArray(function (err, user) {
                    // so now, we can return all students to the screen.
                    res.status(200).json({ user });
                });
        }
        else {
            res.send("failure");
        }
    });
};

exports.getUserByID = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (!err) {

            var query = { UserID: req.params.UserID };
            db.collection("Users").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).json({ 'Users': result });
                db.close();
            });

        }
        else {
            res.send("failure");
        }
    });

};

exports.getUserByEmail = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var query = { Email: req.params.Email };
            db.collection("Users").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.status(200).json({ 'Users': result });
                db.close();
            });
        }
        else {
            res.send("failure");
        }
    });
};