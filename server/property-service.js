var PROPERTIES = require('./mock-properties').data,
    favorites = [];
var testv1 = 9999;
var testobj = {id:5,content:"asfasf"};

function findAll(req, res, next) {
    return res.json(PROPERTIES);

};

function findById(req, res, next) {
    var id = req.params.id;
    testv1 = testv1 +3;
    testobj.id = testobj.id +5;
    var ip = 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
    console.log("GET type ", "client:", ip, "global v1", testv1, "global v2", testobj);
    res.json(testv1+JSON.stringify(testobj));
    //res.json(PROPERTIES[id - 1]);
}

function getFavorites(req, res, next) {
    res.json(favorites);
}

function favorite(req, res, next) {
    var property = req.body;
    var exists = false;
    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === property.id) {
            exists = true;
            break;
        }
    }
    if (!exists) favorites.push(property);
    res.send("success")
}

function unfavorite(req, res, next) {
    var id = req.params.id;
    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == id) {
            favorites.splice(i, 1);
            break;
        }
    }
    res.json(favorites)
}

function like(req, res, next) {
    var property = req.body;
    PROPERTIES[property.id - 1].likes++;
    testv1 = testv1 +4;
    testobj.id = testobj.id +6;
    var ip = 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
    console.log("POST type ", "client:", ip, "global v1", testv1, "global v2", testobj);
    
    res.json(PROPERTIES[property.id - 1].likes);
}

exports.findAll = findAll;
exports.findById = findById;
exports.getFavorites = getFavorites;
exports.favorite = favorite;
exports.unfavorite = unfavorite;
exports.like = like;
